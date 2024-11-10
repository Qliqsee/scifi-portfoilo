import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

import { useSoundContext } from "@/context/Sound/Sound.context";

interface iAudio {
  silent?: any;
  [key: string]: any;
}

interface SoundsProps {
  audio?: iAudio;
  forwardedRef?: any;
  [key: string]: any;
}

function withSounds() {
  return (Inner: any) => {
    const Sounds = ({ audio, forwardedRef, ...etc }: SoundsProps) => {
      const context = useSoundContext();

      const audioContext = getAudio();

      const sounds = audioContext.silent ? {} : context;

      function getAudio() {
        return {
          silent: false,
          ...audio,
        };
      }

      return <Inner {...etc} ref={forwardedRef} audio={audioContext} sounds={sounds} />;
    };

    const WithSounds = React.forwardRef((props, ref) => {
      return <Sounds {...props} forwardedRef={ref} />;
    });

    WithSounds.displayName = `WithSounds-${Inner.displayName || Inner.name || "Component"}`;

    return hoistNonReactStatics(WithSounds, Inner);
  };
}

export { withSounds };
