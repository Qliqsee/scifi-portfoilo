import { useViewport } from "@/hooks/useViewport/useViewport";
import { theme } from "@/settings/theme";
import React, { useEffect } from "react";

interface Props {
  // theme?: any;
  energy?: any;
  children?: any;
}

const Component = React.forwardRef(({ energy, children }: Props, ref) => {
  const { small, medium } = useViewport();

  useEffect(() => {
    const duration = getDuration();

    energy.updateDuration(duration);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getDuration() {
    const enterFrame = (small || medium ? 2 : 4) * theme.animation.time;
    const elementsInFrames = 2;
    const enterElements = elementsInFrames * theme.animation.time;

    const enter = enterFrame + enterElements;

    return { enter };
  }

  React.useImperativeHandle(ref, () => ({
    getDuration,
  }));

  return children;
});

Component.displayName = "Appcontent";
export { Component };
