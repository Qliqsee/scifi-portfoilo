import { IAnimationRef } from "@/hoc/withAnimation/withAnimation.types";

// TODO: Type properly
export interface Props {
  children?: React.ReactNode;
  sounds?:any
  createSounds?:any
  createPlayer?:any
}

export interface IAnimationDuration {
  enter: number;
  exit: number;
  stagger?: number;
}

export type TAnimationStatus = "entering" | "entered" | "exiting" | "exited";

export interface IEnergy {
  animate?: boolean | null;
  show?: boolean | null;
  independent?: boolean | null;
  duration?: number | IAnimationDuration | null;
  entering?: boolean | null;
  entered?: boolean | null;
  exiting?: boolean | null;
  exited?: boolean | null;
  status?: TAnimationStatus | null;
  updateContextDuration?: (newDuration: IAnimationDuration | number) => void;
}

export interface AnimationSubscriber {
  ref: React.MutableRefObject<IAnimationRef | null>;
  callback: (energy?: IEnergy) => void;
  energy: IEnergy | null;
}
