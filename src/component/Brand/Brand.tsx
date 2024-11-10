import anime from "animejs";
import React, { useEffect, useRef } from "react";
import cx from "classnames";

import { Link } from "../Link";

interface Props {
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
  isHeader?: boolean;
}

const Component = React.forwardRef(
  (
    {
      classes,
      energy,
      sounds,
      className,
      link = "/",
      hover,
      stableTime,
      onEnter,
      onExit,
      onLinkStart,
      onLinkEnd,
      isHeader,
      ...etc
    }: Props,
    ref
  ) => {
    const svgElementRef = useRef<any>(null);

    useEffect(() => {
      if (!stableTime) {
        energy.updateDuration({ enter: 820 });
      }

      const svgElement = svgElementRef.current;

      return () => {
        const paths = svgElement?.querySelectorAll("path");
        anime.remove(paths);
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function enter() {
      const paths = svgElementRef.current?.querySelectorAll("path");

      anime.set(svgElementRef.current, { opacity: 1 });

      // sounds.logo.play();

      anime({
        targets: paths,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "linear",
        delay: (_, index) => (stableTime ? 0 : index * energy.duration.stagger),
        duration: (path: any) => (stableTime ? energy.duration.enter : path.getTotalLength()),
        complete: () => {
          onEnter && onEnter();
        },
      });
    }

    function exit() {
      const paths = svgElementRef.current?.querySelectorAll("path");

      // sounds.fade.play();

      anime({
        targets: svgElementRef.current,
        easing: "easeInCubic",
        duration: energy.duration.exit,
        opacity: 0,
      });
      anime({
        targets: paths,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "linear",
        direction: "reverse",
        duration: energy.duration.exit,
        complete: () => {
          anime.set(svgElementRef.current, { opacity: 0 });
          onExit && onExit();
        },
      });
    }

    React.useImperativeHandle(ref, () => ({
      enter,
      exit,
    }));

    return (
      <h1 className={cx(classes.root, hover && classes.hover, className)} {...etc}>
        <Link className={classes.link} href={link} title="Qliqsee portfolio logo" onLinkStart={onLinkStart} onLinkEnd={onLinkEnd}>
          <span className={classes.title}>Qliqsee</span>{" "}
          <svg
            ref={(ref) => {
              svgElementRef.current = ref;
            }}
            className={classes.svg}
            viewBox={isHeader ? "0 0 1400 93" : "0 0 930 93"}
            width={"100%"}
            height={"100%"}
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => sounds.hover.play()}
          >
            <path className={classes.path} d="M473 81H609.5V46H504.5V10H927" />
            <path className={classes.path} d="M181 3V81H260" />
            <path className={classes.path} d="M746.5 2V81H825.5" />
            <path className={classes.path} d="M769.5 42H825.5" />
            <path className={classes.path} d="M663.5 42H719.5" />
            <path className={classes.path} d="M643.5 2V81H722.5" />
            <path className={classes.path} d="M289.544 89.4865L288 1" />
            <path className={classes.path} d="M321 9H451V73H321V9Z" />
            <path className={classes.path} d="M12 12H142V76H12V12Z" />
            <path className={classes.path} d="M379.263 59.022L410.263 98.022" />
            <path className={classes.path} d="M70.2626 62.022L101.263 101.022" />
          </svg>
        </Link>
      </h1>
    );
  }
);

Component.displayName = "Brand";

export { Component };
