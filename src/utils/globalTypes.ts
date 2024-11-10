import { IEnergy } from "@/context/Animation/types";
import { IAnimationRef, TOnUpdateEnergy } from "@/hoc/withAnimation/withAnimation.types";
import { IAudio } from "@/hoc/withSounds/types";

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type IhocProps = {
  inner?: string;
  forwardedRef?: IAnimationRef | null;
  animation?: IEnergy & TOnUpdateEnergy;
  audio?: IAudio;
};
