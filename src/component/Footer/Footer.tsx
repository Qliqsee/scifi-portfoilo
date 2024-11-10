import React, { useEffect, useRef, useState } from "react";
import cx from "classnames";
import anime from "animejs";
import { rgba } from "polished";

import { useViewport } from "@/hooks/useViewport/useViewport";
import { Sequence } from "../Sequence";
import { SocialLinks } from "../SocialLinks";
import { Legal } from "../Legal";
import { theme } from "@/settings/theme";

interface Props {
  // theme?: any;
  classes?: any;
  energy?: any;
  audio?: any;
  sounds?: any;
  className?: any;
  children?: any;
}

const Component = React.forwardRef(({ classes, energy, audio, sounds, className, children, ...etc }: Props, ref) => {
  const { small, medium } = useViewport();

  const elementRef = useRef<any>(null);
  const svgRef = useRef<any>(null);

  const [state, setState] = useState<{ show?: boolean; shapes?: any[] }>({
    show: false,
    shapes: [],
  });

  useEffect(() => {
    const durationEnter = getDurationEnter();

    energy.updateDuration({ enter: durationEnter });

    draw();

    window.addEventListener("resize", onResize);

    return () => {
      stop();

      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onResize = () => {
    draw();
    reset();
  };

  function draw() {
    const width = elementRef.current?.offsetWidth;
    const height = elementRef.current?.offsetHeight;

    svgRef.current?.setAttribute("width", width);
    svgRef.current?.setAttribute("height", height);

    const boxWidth = Math.min(1000, width);
    const offset = small ? 5 : 20;
    const pit = small ? 5 : 10;

    const x1 = (width - boxWidth) / 2;
    const x2 = (width - boxWidth) / 2 + offset;
    const x3 = x2 + boxWidth / 2;
    const x4 = x2 + boxWidth - offset * 2;
    const x5 = x4 + offset;

    const backgroundColor = rgba(theme.color.background.dark, 0.7);
    const lineColor = rgba(theme.color.primary.dark, 0.5);

    const ground = {
      d: `M0,0 L${x1},0 L${x2},${pit} L${x4},${pit} L${x5},0 L${width},0 L${width},${height} L0,${height} L0,0`,
      fill: backgroundColor,
      stroke: backgroundColor,
    };
    const line1 = {
      d: `M0,0 L${x1},0`,
      stroke: lineColor,
    };
    const slash1 = {
      d: `M${x1},0 L${x2},${pit}`,
      stroke: theme.color.tertiary.main,
      strokeWidth: 3,
    };
    const line2 = {
      d: `M${x2},${pit} L${x3},${pit}`,
      stroke: lineColor,
    };
    const line3 = {
      d: `M${x4},${pit} L${x3},${pit}`,
      stroke: lineColor,
    };
    const slash2 = {
      d: `M${x5},0 L${x4},${pit}`,
      stroke: theme.color.tertiary.main,
      strokeWidth: 3,
    };
    const line4 = {
      d: `M${width},0 L${x5},0`,
      stroke: lineColor,
    };

    const shapes = [ground, line1, slash1, line2, line3, slash2, line4];

    setState((prev) => ({ ...prev, shapes }));
  }

  function getDurationEnter() {
    return (small || medium ? 2 : 4) * theme.animation.time;
  }

  function playSound() {
    if (!sounds.deploy.playing()) {
      sounds.deploy.play();
    }
  }

  function stopSound() {
    sounds.deploy.stop();
  }

  function enter() {
    const shapes = Array.from(svgRef.current?.querySelectorAll("path"));
    const [ground, line1, slash1, line2, line3, slash2, line4]: any = shapes;
    const duration = getDurationEnter();

    anime.set(shapes, { opacity: 0 });

    playSound();

    anime({
      targets: elementRef.current,
      translateY: ["100%", 0],
      easing: "easeOutCubic",
      duration,
      complete: () => stopSound(),
    });

    anime({
      targets: ground,
      opacity: [0, 1],
      easing: "easeOutCubic",
      duration,
      complete: () => {
        draw();
        setState((prev) => ({ ...prev, show: true }));
      },
    });

    const shapesGroup1 = [line1, line4];
    const scaleGroup1 = shapesGroup1[0].getTotalLength() / elementRef.current?.offsetWidth;
    const durationGroup1 = duration * scaleGroup1;

    anime.set(shapesGroup1, { opacity: 1 });
    anime({
      targets: shapesGroup1,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "linear",
      duration: durationGroup1,
    });

    const shapesGroup2 = [slash1, slash2];
    const scaleGroup2 = shapesGroup2[0].getTotalLength() / elementRef.current?.offsetWidth;
    const durationGroup2 = duration * scaleGroup2;

    anime.set(shapesGroup2, { opacity: 1 });
    anime({
      targets: shapesGroup2,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "linear",
      delay: durationGroup1,
      duration: durationGroup2,
    });

    const shapesGroup3 = [line2, line3];
    const scaleGroup3 = shapesGroup3[0].getTotalLength() / elementRef.current?.offsetWidth;
    const durationGroup3 = duration * scaleGroup3;

    anime.set(shapesGroup3, { opacity: 1 });
    anime({
      targets: shapesGroup3,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "linear",
      delay: durationGroup1,
      duration: durationGroup3,
    });
  }

  function exit() {
    const shapes = Array.from(svgRef.current?.querySelectorAll("path"));
    const [ground, line1, slash1, line2, line3, slash2, line4]: any = shapes;
    const duration = energy.duration.exit;

    sounds.deploy.play();

    setState((prev) => ({ ...prev, show: false }));

    anime({
      targets: ground,
      opacity: [1, 0],
      easing: "easeOutCubic",
      duration,
      complete: () => stopSound(),
    });

    const shapesGroup1 = [line1, line4];
    const scaleGroup1 = shapesGroup1[0].getTotalLength() / elementRef.current?.offsetWidth;
    const durationGroup1 = duration * scaleGroup1;

    anime({
      targets: shapesGroup1,
      strokeDashoffset: [anime.setDashoffset, 0],
      direction: "reverse",
      easing: "linear",
      duration: durationGroup1,
    });

    const shapesGroup2 = [slash1, slash2];
    const scaleGroup2 = shapesGroup2[0].getTotalLength() / elementRef.current?.offsetWidth;
    const durationGroup2 = duration * scaleGroup2;

    anime({
      targets: shapesGroup2,
      strokeDashoffset: [anime.setDashoffset, 0],
      direction: "reverse",
      easing: "linear",
      delay: durationGroup1,
      duration: durationGroup2,
    });

    const shapesGroup3 = [line2, line3];
    const scaleGroup3 = shapesGroup3[0].getTotalLength() / elementRef.current?.offsetWidth;
    const durationGroup3 = duration * scaleGroup3;

    anime({
      targets: shapesGroup3,
      strokeDashoffset: [anime.setDashoffset, 0],
      direction: "reverse",
      easing: "linear",
      delay: durationGroup1,
      duration: durationGroup3,
    });
  }

  function stop() {
    const shapes = svgRef.current?.querySelectorAll("path");

    anime.remove(shapes);
    anime.remove(elementRef.current);
  }

  function reset() {
    const show = energy.entering || energy.entered;
    const shapes = Array.from(svgRef.current?.querySelectorAll("path"));

    setState((prev) => ({ ...prev, show }));

    shapes.forEach((shape: any) => {
      shape.removeAttribute("style");
      shape.removeAttribute("stroke-dasharray");
      shape.removeAttribute("stroke-dashoffset");
    });

    anime.set(elementRef.current, { translateY: 0 });
    anime.set(shapes, { opacity: show ? 1 : 0 });
  }

  React.useImperativeHandle(ref, () => ({
    draw,
    getDurationEnter,
    playSound,
    stopSound,
    enter,
    exit,
    stop,
    reset,
  }));

  return (
    <footer
      className={cx(classes.root, className)}
      ref={(ref) => {
        elementRef.current = ref;
      }}
      {...etc}
    >
      <svg
        className={classes.svg}
        ref={(ref) => {
          svgRef.current = ref;
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {state?.shapes?.map((shape: any, index: any) => (
          <path
            key={index}
            className={classes.path}
            stroke={shape.stroke || theme.color.primary.dark}
            strokeWidth={shape.strokeWidth || 1}
            fill={shape.fill}
            d={shape.d}
          />
        ))}
      </svg>

      <div className={classes.content}>
        <Sequence animation={{ show: state?.show, independent: true }}>
          <SocialLinks className={classes.socialLinks} itemClassName={classes.socialLinksItem} animateY={false} />
          <Legal className={classes.legal} />
        </Sequence>
      </div>
    </footer>
  );
});

Component.displayName = "Footer";

export { Component };
