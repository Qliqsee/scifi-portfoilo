import React, { useEffect, useRef } from "react";
import anime from "animejs";

import cx from "classnames";

interface Props {
  classes?: any;
  energy?: any;
  audio?: any;
  sounds?: any;
  className?: any;
  children?: any;
  node?: any;
  isAboutPhotoFader: any;
}

const Component = React.forwardRef(
  ({ className, classes, energy, audio, sounds, children, node = "span", isAboutPhotoFader, ...etc }: Props, ref) => {
    const elementRef = useRef<any>(null);

    function enter() {
      const time = energy.duration.enter;

      // sounds.fade && sounds.fade.play();

      animate({
        keyframes: [
          { opacity: 1, duration: time / 3 },
          { opacity: 0, duration: time / 5 },
          { opacity: 1, duration: time / 2 },
        ],
      });
    }

    function exit() {
      const time = energy.duration.exit;

      // sounds.fade && sounds.fade.play();

      animate({
        keyframes: [
          { opacity: 0, duration: time / 3 },
          { opacity: 1, duration: time / 5 },
          { opacity: 0, duration: time / 2 },
        ],
      });
    }

    function animate(params: any) {
      unanimate();

      anime({
        targets: elementRef.current,
        easing: "easeOutCubic",
        ...params,
      });
    }

    function unanimate() {
      anime.remove(elementRef.current);
    }

    useEffect(() => {
      return () => {
        unanimate();
        // sounds.fade && sounds.fade.stop();
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useImperativeHandle(ref, () => ({
      enter,
      exit,
    }));

    return React.createElement(
      node,
      {
        ref: (ref) => (elementRef.current = ref),
        className: cx(classes.root, isAboutPhotoFader ? classes.aboutPhoto : "", className),
        ...etc,
      },
      children
    );
  }
);

Component.displayName = "fader";

export { Component };
