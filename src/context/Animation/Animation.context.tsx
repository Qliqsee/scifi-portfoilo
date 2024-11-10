// import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
// import { SetState } from "@/utils/globalTypes";
// import { AnimationSubscriber, IAnimationDuration, IEnergy, Props, TAnimationStatus } from "./types";
// import { IAnimationRef } from "@/hoc/withAnimation/withAnimation.types";

// export interface IAnimationContext {
//   // animation enerygy
//   animationEnergy: IEnergy;
//   setAnimationEnergy: SetState<IEnergy>;

//   // animation duration
//   contextDuration: IAnimationDuration | null;

//   // animation methods
//   getEnergy: (ref: React.MutableRefObject<IAnimationRef | null>) => IEnergy | null;
//   unSubscribe: (ref: React.MutableRefObject<IAnimationRef | null>) => void;
//   subscribe: (ref: React.MutableRefObject<IAnimationRef | null>, callback: (energy?: IEnergy) => void) => void;
//   updateSubscriber: (subscriber: AnimationSubscriber, status: TAnimationStatus) => void;

//   // Subscribers
//   subscribers: React.MutableRefObject<(AnimationSubscriber | null)[]>;
// }

// export const AnimationContext = createContext<IAnimationContext>({} as IAnimationContext);

// export const useAnimationContext = () => {
//   return useContext(AnimationContext);
// };

// export const AnimationContextProvider = ({ children }: Props) => {
//   // refs
//   const subscribers = useRef<(AnimationSubscriber | null)[]>([]);

//   // states
//   const [contextDuration, setContextDuration] = useState<IAnimationDuration | null>(null);

//   const updateContextDuration = useCallback((newDuration: IAnimationDuration | number) => {
//     if (typeof newDuration === "number") {
//       setContextDuration((prevDuration) => ({
//         ...prevDuration,
//         enter: newDuration,
//         exit: newDuration,
//       }));
//     } else {
//       setContextDuration((prevDuration) => ({
//         ...prevDuration,
//         ...newDuration,
//       }));
//     }
//   }, []);

//   const [animationEnergy, setAnimationEnergy] = useState<IEnergy>({
//     updateContextDuration,
//   });

//   // methods
//   const subscribe = useCallback(
//     (ref: React.MutableRefObject<IAnimationRef | null>, callback: (energy?: IEnergy) => void) => {
//       const isSubscribed = subscribers.current?.find((subscriber) => subscriber?.ref === ref);

//       if (isSubscribed) return;

//       const energy = ref.current?.getEnergyState?.(ref.current?.status) || null;
//       const newSubscription = { ref, callback, energy };

//       // TODO: Ensure callback is updated when subscribers change
//       subscribers.current = [...subscribers.current, newSubscription];
//     },
//     [subscribers]
//   );

//   const unSubscribe = useCallback(
//     (ref: React.MutableRefObject<IAnimationRef | null>) => {
//       // TODO: Ensure callback is updated when subscribers change
//       subscribers.current = subscribers.current?.map((subscriber) => (subscriber?.ref === ref ? null : subscriber));
//     },
//     [subscribers]
//   );

//   const getEnergy = useCallback(
//     (ref: React.MutableRefObject<IAnimationRef | null>) => {
//       // TODO: Ensure callback is updated when subscribers change
//       const subscription = subscribers.current?.find((subscriber) => subscriber?.ref === ref);

//       if (subscription) return subscription.energy;

//       return null;
//     },
//     [subscribers]
//   );

//   const updateSubscriber = useCallback((subscriber: AnimationSubscriber, status: TAnimationStatus) => {
//     subscriber.energy = subscriber?.ref.current?.getEnergyState?.(status) || null;
//   }, []);

//   // context Value
//   const value = useMemo(
//     () => ({
//       animationEnergy,
//       setAnimationEnergy,
//       contextDuration,
//       getEnergy,
//       unSubscribe,
//       subscribe,
//       updateSubscriber,
//       subscribers,
//     }),
//     [animationEnergy, contextDuration, getEnergy, unSubscribe, subscribe, updateSubscriber, subscribers]
//   );

//   return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>;
// };

import { createContext, useContext } from "react";

interface Props {
  children: any;
  value: any;
}

export type tAnimationStatus = "entering" | "entered" | "exiting" | "exited";

export interface iAnimationContext {
  status?: tAnimationStatus;
  subscribe?: any;
  getEnergyState?: any;
  unsubscribe?: any;
  getEnergy?: any;
  entering?: any;
  exiting?: any;
  getStatus?: any;
}

const AnimationContext = createContext<iAnimationContext | null>(null);

const useAnimationContext = () => {
  return useContext(AnimationContext);
};

const AnimationContextProvider = ({ children, value }: Props) => {
  return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>;
};

export { AnimationContext, useAnimationContext, AnimationContextProvider };
