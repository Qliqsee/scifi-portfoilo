import {
  AnimationContextProvider,
  iAnimationContext,
  tAnimationStatus,
  useAnimationContext,
} from "@/context/Animation/Animation.context";
import { ENTERED, ENTERING, EXITED, EXITING } from "@/helpers/animationStatus";
import { isNumber } from "@/helpers/general";
import { theme } from "@/settings/theme";
import React, { useEffect, useRef } from "react";

interface SequenceProps {
  // theme?: any;
  stagger?: any;
  animation?: any;
  origin?: any;
  children: any;
}

const Component = React.forwardRef((props: SequenceProps, ref) => {
  const { children, origin } = props;

  // mutables

  const subscribers = useRef<any>([]);
  const timeouts = useRef<any>({});

  const context = useAnimationContext();
  const prevContext = useRef(context);

  //

  useEffect(() => {
    const prevStatus = prevContext.current?.status;
    const currentStatus = context?.status;

    if (prevStatus !== currentStatus) {
      if (currentStatus === ENTERING) {
        enter();
      } else if (currentStatus === EXITING) {
        exit();
      }
    }

    prevContext.current = context;

    return () => {
      Object.values(timeouts.current).forEach((timeout: any) => clearTimeout(timeout));
      timeouts.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context, props]);

  const subscribe = (ref: iAnimationContext, callback: any) => {
    if (!ref || !callback) {
      alert("Subscriber needs valid Animation component and callback.");
      throw new Error("Subscriber needs valid Animation component and callback.");
    }

    const createdSubscription = subscribers.current?.find((sub: any) => sub && sub.ref === ref);

    if (createdSubscription) {
      return;
    }

    const refStatus = typeof ref?.getStatus === "function" ? ref?.getStatus() : ref?.status;

    const energy = ref.getEnergyState(refStatus);

    const newSubscription = { ref, callback, energy };

    subscribers.current = [...subscribers.current, newSubscription];
  };

  const unsubscribe = (ref: iAnimationContext) => {
    subscribers.current = subscribers.current?.map((sub: any) => {
      if (sub && sub.ref === ref) {
        return null;
      }
      return sub;
    });
  };

  const getEnergy = (ref: iAnimationContext) => {
    const createdSubscription = subscribers.current?.find((sub: any) => sub && sub.ref === ref);

    if (createdSubscription) {
      return createdSubscription.energy;
    }

    return null;
  };

  function enter() {
    const { stagger } = props;

    let lastTime = 0;

    subscribers.current?.forEach((subscriber: any, index: number) => {
      if (!subscriber) {
        return;
      }

      subscriber.energy = subscriber.ref.getEnergyState(subscriber.ref.status);

      const duration = subscriber.energy.duration.enter;

      let startTime;

      if (stagger) {
        startTime = index * (isNumber(stagger) ? stagger : theme.animation.stagger);
      } else {
        startTime = lastTime;
      }

      const endTime = startTime + duration;
      lastTime = endTime;

      schedule(index, startTime, () => {
        updateSubscriber(subscriber, ENTERING);

        schedule(index, endTime, () => {
          updateSubscriber(subscriber, ENTERED);
        });
      });
    });
  }

  function exit() {
    const duration = theme.animation.time;

    subscribers.current?.forEach((subscriber: any, index: any) => {
      updateSubscriber(subscriber, EXITING);

      schedule(index, duration, () => {
        updateSubscriber(subscriber, EXITED);
      });
    });
  }

  function updateSubscriber(subscriber: any, status: tAnimationStatus) {
    subscriber.energy = subscriber.ref.getEnergyState(status);
    subscriber.callback(subscriber.energy);
  }

  function schedule(key: any, time: any, callback: any) {
    unschedule(key);
    timeouts.current[key] = setTimeout(() => callback(), time);
  }

  function unschedule(key: any) {
    clearTimeout(timeouts.current[key]);
  }

  React.useImperativeHandle(ref, () => ({
    enter,
    subscribe,
    unsubscribe,
    getEnergy,
    updateSubscriber,
    schedule,
    unschedule,
    exit,
  }));

  const gateContext = {
    subscribe,
    unsubscribe,
    getEnergy,
  };

  return <AnimationContextProvider value={gateContext}>{children}</AnimationContextProvider>;
});

Component.displayName = "Sequence";

export { Component };
