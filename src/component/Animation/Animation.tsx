import { AnimationContextProvider, useAnimationContext } from "@/context/Animation/Animation.context";
import { IEnergy } from "@/context/Animation/types";
import { ENTERED, ENTERING, EXITED, EXITING, getAnimationStatusState } from "@/helpers/animationStatus";
import { isNumber } from "@/helpers/general";
import { theme } from "@/settings/theme";
import React, { useEffect, useRef, useState } from "react";

interface Props extends IEnergy {
  animate?: any;
  show?: any;
  independent?: any;
  onUpdate?: any;
  // theme?: any;
  duration?: any;
  origin?: any;
  animationRef?: any;

  children: React.ReactNode;
}

const Component = React.forwardRef((props: Props, ref) => {
  const { children, animate = true, show = true, independent = true, duration, onUpdate, origin, animationRef } = props;
  // Mutables
  const statusRef = useRef(animate ? EXITED : ENTERED);
  const showRef = useRef<any>(null);
  const timeoutRef = useRef<any>(null);
  const contextDurationRef = useRef<any>(null);
  const idRef = useRef<any>(Date.now());

  const context = useAnimationContext();

  const [state, setState] = useState({
    // FIXME
    // executedStatus:animate ? EXITED : ENTERED,
    executedStatus: statusRef.current,
    energy: getEnergyState(statusRef.current),
  });

  const properties = {
    status: statusRef.current,
    getEnergyState,
  };

  useEffect(() => {
    const local = {
      onEnergyChange,
      canShow,
      getEnergyState,
      updateStatus,
      schedule,
      unschedule,
      getDuration,
      contextUpdateDuration,
      enter,
      exit,
      getStatus: () => statusRef.current,
      id: idRef.current,
    };

    const parentEnergy = context;

    if (parentEnergy && parentEnergy.subscribe) {
      // TODO: confirm subscription
      parentEnergy.subscribe(local, onEnergyChange);
    }

    showRef.current = canShow();

    // TODO: Use the condition
    if (animate && showRef.current) {
      enter();
    }

    return () => {
      unschedule();

      const parentEnergy = context;

      if (parentEnergy && parentEnergy.subscribe) {
        parentEnergy.unsubscribe(this);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onEnergyChange();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, props]);

  useEffect(() => {
    if (onUpdate) {
      onUpdate(state.executedStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const onEnergyChange = () => {
    // on energy change

    const show = canShow();

    if (animate && show !== showRef.current) {
      showRef.current = show;
      if (showRef.current) {
        enter();
      } else {
        exit();
      }
    }
  };

  function canShow() {
    const local = {
      onEnergyChange,
      canShow,
      getEnergyState,
      updateStatus,
      schedule,
      unschedule,
      getDuration,
      contextUpdateDuration,
      enter,
      exit,
      getStatus: () => statusRef.current,
      id: idRef.current,
    };

    const parentEnergy = context;

    if (independent || !parentEnergy) {
      return show;
    }

    if (parentEnergy.subscribe) {
      const energy = parentEnergy.getEnergy(local);
      return energy.entering || energy.entered;
    }

    return parentEnergy.status === ENTERED;
  }

  function getEnergyState(status: any) {
    status = status || state.executedStatus;

    const show = showRef.current;
    const animationStatusState = getAnimationStatusState(status);
    const duration = getDuration();

    return {
      animate,
      show,
      independent,
      duration,
      ...animationStatusState,
      updateDuration: contextUpdateDuration,
    };
  }

  function updateStatus(status: any) {
    statusRef.current = status;

    if (state.executedStatus !== status) {
      setState(() => ({
        executedStatus: status,
        energy: getEnergyState(status),
      }));
    }
  }

  function schedule(time: any, callback: any) {
    unschedule();
    timeoutRef.current = setTimeout(() => callback(), time);
  }

  function unschedule() {
    clearTimeout(timeoutRef.current);
  }

  function getDuration() {
    const settingDeration = theme.animation.time;
    const settingStagger = theme.animation.stagger;

    let value;

    if (isNumber(duration)) {
      value = {
        enter: duration,
        exit: duration,
        stagger: settingStagger,
      };
    } else {
      value = {
        enter: settingDeration,
        exit: settingDeration,
        stagger: settingStagger,
        ...duration,
      };
    }

    return {
      ...value,
      ...contextDurationRef.current,
    };
  }

  function contextUpdateDuration(newDuration: any) {
    if (isNumber(newDuration)) {
      contextDurationRef.current = {
        ...contextDurationRef.current,
        enter: newDuration,
        exit: newDuration,
      };
    } else {
      contextDurationRef.current = {
        ...contextDurationRef.current,
        ...newDuration,
      };
    }
  }

  function enter() {
    // FIXME: changed opertor from && to ||
    if (statusRef.current === ENTERING || statusRef.current === ENTERED) {
      // if (statusRef.current === ENTERING && statusRef.current === ENTERED) {
      return;
    }

    const duration = getDuration();

    updateStatus(ENTERING);

    schedule(duration.enter, () => updateStatus(ENTERED));
  }

  function exit() {
    // FIXME: changed opertor from && to ||
    if (statusRef.current === EXITING || statusRef.current === EXITED) {
      // if (statusRef.current === EXITING && statusRef.current === EXITED) {
      return;
    }

    const duration = getDuration();

    updateStatus(EXITING);

    schedule(duration.exit, () => updateStatus(EXITED));
  }

  React.useImperativeHandle(ref, () => ({
    onEnergyChange,
    canShow,
    getEnergyState,
    updateStatus,
    schedule,
    unschedule,
    getDuration,
    contextUpdateDuration,
    enter,
    exit,
    status: statusRef.current,
  }));

  return <AnimationContextProvider value={state.energy}>{children}</AnimationContextProvider>;
});

Component.displayName = "Animation";

export { Component };
