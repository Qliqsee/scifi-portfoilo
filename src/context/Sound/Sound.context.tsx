// import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
// import { SetState } from "@/utils/globalTypes";
// import { Props } from "./types";
// import { createPlayer as cp } from "@/tools/createPlayer";
// import { createSounds as cs } from "@/tools/createSounds";

// export interface ISoundContext {}

// export const SoundContext = createContext<ISoundContext>({} as ISoundContext);

// export const useSoundContext = () => {
//   return useContext(SoundContext);
// };

// export const SoundContextProvider = ({ children, createPlayer = cp, createSounds = cs, sounds: soundsProp }: Props) => {
//   const [sounds, setSounds] = useState(getSounds());

//   useEffect(() => {
//     setSounds(getSounds());
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [soundsProp]);

//   function getSounds() {
//     const { settings, players } = createSounds(soundsProp);

//     const soundsPlayers: any = {};

//     Object.keys(players).forEach((name) => {
//       const player = players[name];
//       soundsPlayers[name] = createPlayer({ ...settings, ...player });
//     });

//     return soundsPlayers;
//   }

//   // context Value

//   return <SoundContext.Provider value={sounds}>{children}</SoundContext.Provider>;
// };

import { createContext, useContext } from "react";

interface Props {
  children: any;
  value: any;
}

export interface iSoundContext {}

const SoundContext = createContext<iSoundContext | null>(null);

const useSoundContext = () => {
  return useContext(SoundContext);
};

const SoundContextProvider = ({ children, value }: Props) => {
  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
};

export { SoundContext, useSoundContext, SoundContextProvider };
