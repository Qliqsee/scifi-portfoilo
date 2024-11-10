import React, { useEffect, useRef, useState } from "react";

import { SoundContextProvider } from "@/context/Sound/Sound.context";
import { createPlayer as createPlayerModule } from "@/tools/createPlayer";
import { createSounds as createSoundsModule } from "@/tools/createSounds";

interface Props {
  sounds?: any;
  createPlayer?: any;
  createSounds?: any;
  children?: any;
}

// TODO: check this file :
// - state initialization souns value
// prev pros useefect sound ref
// check other files if state causes uncessary rerenders

const Component = (props: Props) => {
  const { sounds, createPlayer = createPlayerModule, createSounds = createSoundsModule, children, ...etc } = props;
  // TODO: this might not be needed
  const soundsRef = useRef<any>(sounds);

  const [state, setState] = useState({ sounds: getSounds() });

  useEffect(() => {
    if (soundsRef.current !== sounds) {
      const sounds = getSounds();
      setState((prev) => ({ ...prev, sounds })); // eslint-disable-line react/no-did-update-set-state
      soundsRef.current = sounds;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  function getSounds() {
    const { settings, players } = createSounds(sounds);

    const soundsPlayers: any = {};

    Object.keys(players).forEach((name) => {
      const player = players[name];
      soundsPlayers[name] = createPlayer({ ...settings, ...player });
    });

    return soundsPlayers;
  }

  return <SoundContextProvider value={state.sounds}>{children}</SoundContextProvider>;
};

export { Component };
