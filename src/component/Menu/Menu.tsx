import React, { useEffect, useRef, useState } from "react";
import anime from "animejs";
import cx from "classnames";

import { useViewport } from "@/hooks/useViewport/useViewport";
import { SCHEME_NORMAL } from "./Menu.constants";
import { Link } from "../Link";
import { Text } from "../Text";
import { Sequence } from "../Sequence";

interface Props {
  // theme?: any;
  classes?: any;
  energy?: any;
  audio?: any;
  sounds?: any;
  className?: any;
  link?: any;
  hover?: any;
  stableTime?: any;
  onEnter?: any;
  onExit?: any;
  onLinkStart?: any;
  onLinkEnd?: any;
  scheme?: any;
}

const Component = React.forwardRef((props: Props, ref) => {
  const {
    classes,
    energy,
    sounds,
    className,
    link,
    hover,
    stableTime,
    onEnter,
    onExit,
    onLinkStart,
    scheme = SCHEME_NORMAL,
    onLinkEnd,
    ...etc
  } = props;

  const prevEnergyRef = useRef<any>(energy);
  const elementRef = useRef<any>(null);

  const viewportRange = useViewport();

  const animateText = scheme === SCHEME_NORMAL;
  const linkProps = {
    className: cx(classes.item, classes.link),
    onMouseEnter: () => sounds.hover.play(),
    onLinkStart,
    onLinkEnd,
  };

  // State to trigger re-renders
  const [dummyState, setDummyState] = useState(false);
  const [showSecuence, setShowSecuence] = useState(false);

  useEffect(() => {
    window.addEventListener("route-change", onURLChange);

    const element = elementRef.current;
    return () => {
      const elements = element?.querySelectorAll("a, b");
      anime.remove(elements);

      window.removeEventListener("route-change", onURLChange);
    };
  }, []);

  useEffect(() => {
    // Check if the energy status has changed
    if (prevEnergyRef.current && prevEnergyRef.current?.status !== energy.status) {
      if (energy.entering) {
        setShowSecuence(true);
      } else if (energy.exiting) {
        setShowSecuence(false);
      }
    }

    // Update the previous energy status
    prevEnergyRef.current = energy;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSecuence, energy, props]);

  const onURLChange = () => {
    // Toggle state to force re-render
    setDummyState((prevState) => !prevState);
  };

  function enter() {
    if (scheme === SCHEME_NORMAL) {
      animateNormalEnter();
    } else {
      animateExpandEnter();
    }
  }

  function animateNormalEnter() {
    const { duration } = energy;

    const divisors = elementRef.current?.querySelectorAll("b");
    const links = elementRef.current?.querySelectorAll("a");

    anime.set(links, { opacity: 1 });

    anime({
      targets: divisors,
      easing: "easeOutCubic",
      scaleY: [0, 1],
      duration: duration.enter,
      delay: (_, index) => index * duration.stagger,
      complete: () => onEnter && onEnter(),
    });
  }

  function animateExpandEnter() {
    const { duration } = energy;

    const divisors = elementRef.current?.querySelectorAll("b");
    const links = elementRef.current?.querySelectorAll("a");

    // sounds.expand.play();

    if (!viewportRange.small) {
      anime({
        targets: divisors[1],
        easing: "easeOutCubic",
        scaleY: [0, 1],
        duration: duration.enter / 2,
      });
      anime({
        targets: [divisors[0], divisors[1]],
        easing: "easeOutCubic",
        scaleY: [0, 1],
        translateX: (_: any, index: any) => [[100, 0, -100][index], 0],
        delay: duration.enter / 2,
        duration: duration.enter / 2,
      });
    }

    anime({
      targets: links,
      easing: "easeOutCubic",
      opacity: 1,
      translateX: (_: any, index: any) => [[150, 75, -75, -150][index], 0],
      delay: viewportRange.small ? 0 : duration.enter / 2,
      duration: viewportRange.small ? duration.enter : duration.enter / 2,
      complete: () => onEnter && onEnter(),
    });
  }

  function exit() {
    const { duration } = energy;

    const divisors = elementRef.current?.querySelectorAll("b");
    const links = elementRef.current?.querySelectorAll("a");

    anime({
      targets: divisors,
      easing: "easeOutCubic",
      scaleY: [1, 0],
      duration: duration.exit,
    });
    anime({
      targets: links,
      easing: "easeOutCubic",
      opacity: 0,
      duration: duration.exit,
      complete: () => onExit && onExit(),
    });
  }

  React.useImperativeHandle(ref, () => ({
    enter,
    exit,
    animateNormalEnter,
    animateExpandEnter,
  }));

  return (
    <Sequence animation={{ show: showSecuence, independent: true }} stagger>
      <nav
        className={cx(classes.root, className)}
        ref={(ref) => {
          elementRef.current = ref;
        }}
        {...etc}
      >
        <Link href="/about" {...linkProps}>
          <Text animation={{ animate: animateText }} audio={{ silent: !animateText }}>
            About
          </Text>
        </Link>
        <b className={cx(classes.item, classes.divisor)}>|</b>
        <Link href="/experience" {...linkProps}>
          <Text animation={{ animate: animateText }} audio={{ silent: !animateText }}>
            Experience
          </Text>
        </Link>
        <b className={cx(classes.item, classes.divisor)}>|</b>
        <Link href="/projects" {...linkProps}>
          <Text animation={{ animate: animateText }} audio={{ silent: !animateText }}>
            Projects
          </Text>
        </Link>
      </nav>
    </Sequence>
  );
});

Component.displayName = "Menu";

export { Component };
