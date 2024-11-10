// export type IWithAnimationProps = {
//   extraData: string;
// };

import { IEnergy, TAnimationStatus } from "@/context/Animation/types";
import { IAudio } from "../withSounds/types";

export type IWithAnimationProps = {
  extraData?: string;
};

export type TOnUpdateEnergy = { onUpdate?: (status: TAnimationStatus | null) => void };

export interface IAnimationRef {
  enter: () => void;
  exit: () => void;
  getEnergyState?: (status?: TAnimationStatus) => IEnergy;
  schedule?: (key: string, time: number, callback: () => void) => void;
  unschedule?: (key: string) => void;
  status?: TAnimationStatus;
}

export interface WithAnimationOptions {}
