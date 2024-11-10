import React, { useRef } from "react";
import cx from "classnames";
import anime from "animejs";

import { getPathLength } from "@/helpers/general";
import { Sequence } from "../Sequence";
import { Text } from "../Text";
import { Button } from "../Button";

interface Props {
  // theme?: any;
  classes?: any;
  energy?: any;
  audio?: any;
  sounds?: any;
  className?: any;
  message?: any;
  option?: any;
  onOption?: any;
}

const Component = React.forwardRef(
  ({ classes, energy, audio, sounds, className, message, option, onOption, ...etc }: Props, ref) => {
    const svgElementRef = useRef<any>(null);

    function enter() {
      const paths = svgElementRef.current?.querySelectorAll("path");

      anime.set(paths, {
        strokeDasharray: getPathLength,
      });

      anime({
        targets: paths,
        strokeDashoffset: [getPathLength, 0],
        easing: "linear",
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
    }

    React.useImperativeHandle(ref, () => ({
      enter,
      exit,
    }));

    return (
      <div className={cx(classes.root, className)} {...etc}>
        <div className={classes.frame}>
          <svg
            className={classes.svg}
            ref={(ref) => {
              svgElementRef.current = ref;
            }}
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* left-top */}
            <path className={classes.path} d="M0,10 L0,0 L10,0" />
            {/* right-top */}
            <path className={classes.path} d="M90,0 L100,0 L100,10" />
            {/* left-bottom */}
            <path className={classes.path} d="M10,40 L0,40 L0,30" />
            {/* right-bottom */}
            <path className={classes.path} d="M100,30 L100,40 L90,40" />
          </svg>
        </div>
        <div className={classes.main}>
          <Sequence origin="Popup-Sequence">
            <div className={classes.message}>
              <Text origin="Popup-Text" audio={audio} animation={{ animate: energy.animate }}>
                {message}
              </Text>
            </div>
            <div className={classes.options}>
              <Button
                origin="Popup-Button"
                className={classes.option}
                audio={audio}
                animation={{ animate: energy.animate }}
                onClick={onOption}
              >
                {option}
              </Button>
            </div>
          </Sequence>
        </div>
      </div>
    );
  }
);

Component.displayName = "Popup";

export { Component };
