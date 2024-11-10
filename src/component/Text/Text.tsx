import React, { useEffect, useRef } from "react";
import cx from "classnames";

import { RANDOM_CHARACTERS, SCHEME_TRANSITION } from "./Text.constants";
import { getRandomCharacters } from "@/helpers/general";
import { createAnimationTick } from "@/helpers/animationTick";
import { theme } from "@/settings/theme";

interface Props {
  // theme?: any;
  classes?: any;
  energy?: any;
  audio?: any;
  sounds?: any;
  className?: any;
  children?: any;
  scheme?: any;
  randomCharacters?: any;
  stableTime?: any;
}

const Component = React.forwardRef(
  (
    {
      // theme,
      classes,
      energy,
      audio,
      sounds,
      className,
      children = "",
      scheme = SCHEME_TRANSITION,
      randomCharacters = RANDOM_CHARACTERS,
      stableTime,
      ...etc
    }: Props,
    ref
  ) => {
    const animationTickRef = useRef<any>(null);
    const overlayTextElementRef = useRef<any>(null);

    const animating = energy.entering || energy.exiting;

    const cls = cx(
      classes.root,
      {
        [classes.hidden]: energy.animate && !energy.show && !animating,
        [classes.animating]: animating,
      },
      className
    );

    function enter() {
      animate(true);
    }

    function exit() {
      animate(false);
    }

    function cancelAnimate() {
      // TODO: fix current?.
      if (animationTickRef.current) {
        animationTickRef.current?.cancel();
        animationTickRef.current = null;
      }
    }

    function playSound() {
      if (energy.animate && sounds.typing && !sounds.typing.playing()) {
        // sounds.typing.play();
      }
    }

    function stopSound() {
      if (sounds.typing) {
        sounds.typing.stop();
      }
    }

    function animate(isEntering: any) {
      if (children.length === 0) {
        return;
      }

      cancelAnimate();

      if (scheme === SCHEME_TRANSITION) {
        animateTransition(isEntering);
      } else {
        animateTransform(isEntering);
      }
    }

    function getDuration() {
      if (stableTime) {
        return theme.animation.time;
      }

      // requestAnimationFrame uses 60 FPS.
      // The time it will take to add/remove a character per frame for
      // the actual text.
      const realDuration = (1000 / 60) * children.length;

      // Animation duration will be at most the animation time setting.
      const duration = Math.min(realDuration, theme.animation.time);

      return duration;
    }

    function animateTransition(isEntering: any) {
      const duration = getDuration();
      const isInverted = !isEntering;

      setOverlayText(isEntering ? "" : children);

      const onCall = ({ timeProgress }: any) => {
        // If:
        // progressLength(n) = progressDuration(ms)
        // totalLength(n) = totalDuration(ms)
        // Then:
        const newLength = Math.round((timeProgress * children.length) / duration);

        const newText = children.substring(0, newLength);
        setOverlayText(newText);

        playSound();

        return isEntering ? newLength <= children.length : newLength > 0;
      };

      const onDone = () => stopSound();

      animationTickRef.current = createAnimationTick({ duration, isInverted, onCall, onDone });
    }

    function animateTransform(isEntering: any) {
      const duration = getDuration();
      const isInverted = !isEntering;

      const initialText = getRandomCharacters(children.length, randomCharacters);
      setOverlayText(initialText);

      const onCall = ({ timeProgress }: any) => {
        // If:
        // progressLength(n) = progressDuration(ms)
        // totalLength(n) = totalDuration(ms)
        // Then:
        const newLength = Math.round((timeProgress * children.length) / duration);

        const newText1 = children.substring(0, newLength);
        const newText2 = getRandomCharacters(children.length - newLength, randomCharacters);
        setOverlayText(newText1 + newText2);

        playSound();

        return isEntering ? newLength <= children.length : newLength > 0;
      };

      const onDone = () => {
        if (isInverted) {
          setOverlayText("");
        }

        stopSound();
      };

      animationTickRef.current = createAnimationTick({ duration, isInverted, onCall, onDone });
    }

    function setOverlayText(text: any) {
      if (overlayTextElementRef.current) {
        overlayTextElementRef.current.textContent = text;
      }
    }

    React.useImperativeHandle(ref, () => ({
      animate,
      getDuration,
      animateTransition,
      cancelAnimate,
      playSound,
      stopSound,
      setOverlayText,
      enter,
      exit,
    }));

    useEffect(() => {
      return () => {
        cancelAnimate();
      };
    }, []);

    return (
      <span className={cls} {...etc}>
        <span className={classes.actualText}>{children}</span>
        {animating && (
          <span className={classes.overlay}>
            <span
              className={classes.overlayText}
              ref={(ref) => {
                overlayTextElementRef.current = ref;
              }}
            />
          </span>
        )}
      </span>
    );
  }
);

Component.displayName = "Text";

export { Component };
