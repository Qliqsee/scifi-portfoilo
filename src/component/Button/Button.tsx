import React, { useRef } from "react";
import anime from "animejs";
import cx from "classnames";

import { getPathLength } from "@/helpers/general";
import { Text } from "../Text";

interface Props {
  // theme?: any;
  classes?: any;
  energy?: any;
  audio?: any;
  sounds?: any;
  className?: any;
  children?: any;
}

const Component = React.forwardRef(({ className, classes, energy, audio, sounds, children, ...etc }: Props, ref) => {
  const svgElementRef = useRef<any>(null);
  const backgroundElementRef = useRef<any>(null);

  function enter() {
    const paths = svgElementRef.current?.querySelectorAll("path");

    anime.set(paths, {
      opacity: 1,
      strokeDasharray: getPathLength,
    });
    anime.set(backgroundElementRef.current, { opacity: 1 });

    anime({
      targets: paths,
      strokeDashoffset: [getPathLength, 0],
      easing: "linear",
      duration: energy.duration.enter,
    });
    anime({
      targets: backgroundElementRef.current,
      easing: "linear",
      opacity: [0, 1],
      duration: energy.duration.enter,
    });
  }

  function exit() {
    const paths = svgElementRef.current?.querySelectorAll("path");

    anime({
      targets: paths,
      strokeDashoffset: [0, getPathLength],
      easing: "linear",
      duration: energy.duration.exit,
    });
    anime({
      targets: backgroundElementRef.current,
      easing: "linear",
      opacity: [1, 0],
      duration: energy.duration.enter,
    });
  }

  React.useImperativeHandle(ref, () => ({
    enter,
    exit,
  }));

  return (
    <button className={cx(classes.root, className)} {...etc}>
      <div
        className={classes.background}
        ref={(ref) => {
          backgroundElementRef.current = ref;
        }}
      />
      <div className={classes.frame}>
        <svg
          className={classes.svg}
          ref={(ref) => {
            svgElementRef.current = ref;
          }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path className={classes.path} d="M0,0 L100,0 L100,100" />
          <path className={classes.path} d="M100,100 L0,100 L0,0" />
        </svg>
      </div>
      <div className={classes.main} onMouseEnter={() => sounds.hover && sounds.hover.play()}>
        <Text audio={audio} animation={{ animate: energy.animate }}>
          {children}
        </Text>
      </div>
    </button>
  );
});

Component.displayName = "Button";

export { Component };
