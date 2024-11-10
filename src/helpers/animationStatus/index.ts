import { TAnimationStatus } from "@/context/Animation/types";

export const ENTERING = "entering";
export const ENTERED = "entered";
export const EXITING = "exiting";
export const EXITED = "exited";

export const getAnimationStatusState = (status: TAnimationStatus | null) => ({
  status,
  [ENTERING]: status === ENTERING,
  [ENTERED]: status === ENTERED,
  [EXITING]: status === EXITING,
  [EXITED]: status === EXITED,
});
