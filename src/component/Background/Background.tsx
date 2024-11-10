"use client";
import React, { useEffect, useRef, useState } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import { getRandomNumber } from "@/helpers/general";
import anime from "animejs";
import cx from "classnames";

interface Props {
  // theme?: any;
  classes?: any;
  energy?: any;
  audio?: any;
  sounds?: any;
  className?: any;
  children?: any;
  initialMaxDuration?: any;
  onEnter?: any;
  onExit?: any;
}
const Component = React.forwardRef((props: Props, ref) => {
  const { initialMaxDuration = 2000, classes, energy, audio, sounds, className, children, onEnter, onExit, ...etc } = props;
  const width = useWindowWidth();

  // Mutables

  const standByStartId = useRef<any>(null);
  const standByAnimationIdRef = useRef<any>(null);

  const dotLinesContainerRef = useRef<any>(null);
  const light1ElementRef = useRef<any>(null);
  const line1ContainerRef = useRef<any>(null);
  const circuitContainerRef = useRef<any>(null);
  const patternsElementRef = useRef<any>(null);

  const [state, setState] = useState<{
    line1Length?: any;
    line2ItemsPositions?: any;
    line3ItemsPositions?: any;
    circuitLines?: any;
    circuitAnimationDone?: any;
  }>({
    line1Length: 0,
    line2ItemsPositions: [],
    line3ItemsPositions: [],
    circuitLines: [],
    circuitAnimationDone: false,
  });

  const { line1Length, line2ItemsPositions, line3ItemsPositions, circuitLines } = state;

  const { width: patternElementWidth, height: patternElementHeight } = getPatternsElementSize();

  useEffect(() => {
    // update energy duration
    const enterDuration = getPathAnimationDuration((47 / 55) * width + 500 / 11);

    energy.updateDuration({ enter: enterDuration });

    draw();

    window.addEventListener("resize", onResize);

    return () => {
      unanimateAll();
      sounds?.start?.stop();

      window.removeEventListener("resize", onResize);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Because we are re-rendering animated elements every time the component
    // is updated, we need to re-start the animations or reset the elements.

    startStandByAnimation();

    anime.set(dotLinesContainerRef.current?.childNodes, { strokeDasharray: "3 7" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, props]);

  const onResize = () => {
    draw();
  };

  function draw() {
    const line1Length = getLine1Length();
    const line2ItemsPositions = getLine2ItemsPositions();
    const line3ItemsPositions = getLine3ItemsPositions();
    const circuitLines = getCircuitLines();

    setState({ ...state, line1Length, line2ItemsPositions, line3ItemsPositions, circuitLines });
  }

  function getLine1Length() {
    const line1Height = 10;
    const { height } = getPatternsElementSize();
    return Math.ceil(height / line1Height);
  }

  function getLine2ItemsPositions() {
    const lineSpace = 100;

    // Width of the background pattern wrapper element
    const { width } = getPatternsElementSize();

    const length = Math.floor(width / lineSpace);

    const itemsPositions = [];

    for (let index = 0; index < length; index++) {
      const itemPosition = getRandomNumber(index * lineSpace, index * lineSpace + lineSpace);
      itemsPositions.push(itemPosition);
    }

    return itemsPositions;
  }

  function getLine3ItemsPositions() {
    const { height } = getPatternsElementSize();
    const lineSpace = 200;
    const length = Math.floor(height / lineSpace);

    const itemsPositions = [];

    for (let index = 0; index < length; index++) {
      const itemPosition = getRandomNumber(index * lineSpace, index * lineSpace + lineSpace);
      itemsPositions.push(itemPosition);
    }

    return itemsPositions;
  }

  function getCircuitLines() {
    // width and height of background wrapper
    const { width, height } = getPatternsElementSize();

    // fufils large screen criterion based on viewport width
    const isLargeScreen = getIsLargeScreen();

    /* original deimensions (if background width and height are equal 
    to this the lines will keep their original value otherwise 
    they will scale appropriately */
    const widthOriginal = 1000;
    const heightOriginal = 600;

    // Scaled dimensions
    const widthScale = width / widthOriginal;
    const heightScale = height / heightOriginal;

    // Lines go from left to right when they start in the left half.
    // And go from right to left when they start in the right half.

    // circuit path values
    let linesOriginal = [
      [
        [31, 80],
        [45, 98],
        [478, 98],
      ],
      [
        [-10, 136],
        [567, 136],
        [597, 96],
        [867, 96],
      ],
      [
        [923, 21],
        [507, 21],
        [496, 33],
        [98, 33],
        [65, -10],
      ],
      [
        [38, 267],
        [157, 267],
      ],
      [
        [1010, 225],
        [566, 225],
        [503, 307],
        [295, 307],
      ],
      [
        [88, 340],
        [362, 340],
        [372, 354],
        [854, 354],
      ],
      [
        [1010, 368],
        [908, 368],
      ],
      [
        [219, 491],
        [236, 512],
        [484, 512],
      ],
      [
        [981, 447],
        [725, 448],
        [688, 495],
      ],
      [
        [855, 536],
        [618, 535],
        [579, 485],
        [-10, 485],
      ],
      [
        [71, 448],
        [104, 405],
        [292, 405],
      ],
      [
        [34, 610],
        [63, 560],
        [147, 560],
        [173, 520],
      ],
      [
        [1010, 176],
        [658, 176],
      ],
    ];

    // more circuit path values for largescreens only
    if (isLargeScreen) {
      linesOriginal = [
        ...linesOriginal,
        [
          [520, 131],
          [572, 64],
        ],
        [
          [27, 174],
          [275, 174],
          [314, 135],
        ],
        [
          [1010, 207],
          [561, 207],
          [528, 251],
          [312, 251],
        ],
        [
          [971, 243],
          [615, 243],
        ],
        [
          [146, 400],
          [490, 400],
          [624, 226],
        ],
        [
          [851, 498],
          [600, 498],
          [585, 479],
          [-10, 479],
        ],
      ];
    }

    // this scales the original lines based on widthScale and heightScale for x and y respectively
    const lines = linesOriginal.map((line) => {
      return line.map(([x, y]) => [x * widthScale, y * heightScale]);
    });

    return lines;
  }

  function enter() {
    const { width } = getPatternsElementSize();
    const duration = Math.min(width, 1000);

    setState({ ...state, circuitAnimationDone: false });

    // Light and horizontal lines
    animate([light1ElementRef.current, ...line1ContainerRef.current?.childNodes], {
      opacity: 1,
      duration,
    });

    // Dot lines
    animate(dotLinesContainerRef.current, { opacity: 1, duration });
    animate([...dotLinesContainerRef.current?.childNodes], {
      strokeDasharray: ["3 35", "3 7"],
      duration,
    });

    // Circuits
    const circuits = Array.from(circuitContainerRef.current?.querySelectorAll("g"));

    let circuitDurationLongest = 0;

    circuits.forEach((circuit: any) => {
      const dotStart = circuit.querySelector("." + classes.circuitDotStart);
      const dotEnd = circuit.querySelector("." + classes.circuitDotEnd);
      const line = circuit.querySelector("." + classes.circuitLine);
      const length = line.getTotalLength();
      const circuitDuration = getPathAnimationDuration(length);
      const dotDuration = duration * (1 / 10);

      circuitDurationLongest = Math.max(circuitDurationLongest, circuitDuration);

      animate(dotStart, {
        opacity: 1,
        duration: dotDuration,
      });
      animate(line, {
        strokeDashoffset: [anime.setDashoffset, 0],
        delay: dotDuration,
        duration: circuitDuration,
      });
      animate(dotEnd, {
        opacity: 1,
        delay: circuitDuration,
        duration: dotDuration,
      });
    });

    clearTimeout(standByStartId.current);
    standByStartId.current = setTimeout(() => {
      setState({ ...state, circuitAnimationDone: true });

      if (onEnter) {
        onEnter();
      }
    }, circuitDurationLongest);

    sounds?.start?.play();
  }

  function exit() {
    const duration = energy.duration.exit;

    setState({ ...state, circuitAnimationDone: false });

    // Light and horizontal lines
    animate([light1ElementRef.current, ...line1ContainerRef.current?.childNodes], {
      opacity: 0,
      duration,
    });

    // Dot lines
    animate(dotLinesContainerRef.current, { opacity: 0, duration });
    animate([...dotLinesContainerRef.current?.childNodes], {
      strokeDasharray: ["3 7", "3 35"],
      duration,
    });

    // Circuit lines
    animate(
      [
        ...circuitContainerRef.current?.querySelectorAll("." + classes.circuitDotStart),
        ...circuitContainerRef.current?.querySelectorAll("." + classes.circuitDotEnd),
      ],
      { opacity: 0, duration: duration * (1 / 10) }
    );
    animate(circuitContainerRef.current?.querySelectorAll("." + classes.circuitLine), {
      strokeDashoffset: [anime.setDashoffset, 0],
      direction: "reverse",
      duration: duration,
      complete: () => {
        if (onExit) {
          onExit();
        }
      },
    });
  }

  function animate(elements: any, params: any) {
    unanimate(elements);

    anime({
      targets: elements,
      easing: "easeInOutQuad",
      ...params,
    });
  }

  function unanimate(elements: any) {
    anime.remove(elements);
  }

  function unanimateAll() {
    unanimate(light1ElementRef.current);
    unanimate(line1ContainerRef.current?.childNodes);
    unanimate(dotLinesContainerRef.current);
    unanimate(dotLinesContainerRef.current?.childNodes);
    unanimate(circuitContainerRef.current?.querySelectorAll("*"));

    stopStandByAnimation();
  }

  function stopStandByAnimation() {
    const circuitLineLights = Array.from(circuitContainerRef.current?.querySelectorAll("." + classes.circuitLineLight) || []);

    clearTimeout(standByStartId.current);
    clearTimeout(standByAnimationIdRef.current);

    anime.remove(circuitLineLights);
    circuitLineLights.forEach((circuitLineLight: any) => {
      circuitLineLight.removeAttribute("style");
    });
    anime.set(circuitLineLights, { opacity: 0 });
  }

  function startStandByAnimation() {
    const isLargeScreen = getIsLargeScreen();

    const run = () => {
      const pathsAll = Array.from(circuitContainerRef.current?.querySelectorAll("." + classes.circuitLineLight));

      const paths = Array(isLargeScreen ? getRandomNumber(2, 4) : getRandomNumber(1, 2))
        .fill(0)
        .map(() => pathsAll[getRandomNumber(0, pathsAll.length - 1)]);

      let longestDuration = 0;

      paths.forEach((path: any, index: any) => {
        const length = path?.getTotalLength();
        const circuitDuration = getPathAnimationDuration(length);
        const size = 20;

        longestDuration = Math.max(longestDuration, circuitDuration);

        // TODO: Use `.animate()` method to simplify setup.
        // Currently, it only animates one path if used.

        anime({
          targets: path,
          duration: circuitDuration,
          direction: index % 2 === 0 ? "normal" : "reverse",
          begin: () => anime.set(path, { opacity: 1 }),
          change: (anim) => {
            const progress = length * (anim.progress / 100);
            path.setAttribute("stroke-dasharray", `0 ${progress} ${size} ${length}`);
          },
          complete: () => anime.set(path, { opacity: 0 }),
        });
      });

      standByAnimationIdRef.current = setTimeout(run, longestDuration);
    };

    stopStandByAnimation();

    run();
  }

  function getPathAnimationDuration(length: any) {
    const isLargeScreen = getIsLargeScreen();

    return Math.min(isLargeScreen ? length : length * 2, initialMaxDuration);
  }

  function getPatternsElementSize() {
    // Width of the background pattern wrapper element
    const width = (patternsElementRef.current && patternsElementRef.current?.offsetWidth) || 0;
    // height of the background pattern wrapper element
    const height = (patternsElementRef.current && patternsElementRef.current?.offsetHeight) || 0;

    return { width, height };
  }

  function getIsLargeScreen() {
    return width > 420;
  }

  React.useImperativeHandle(ref, () => ({
    draw,
    getLine1Length,
    getLine2ItemsPositions,
    getLine3ItemsPositions,
    getCircuitLines,
    enter,
    exit,
    animate,
    unanimate,
    unanimateAll,
    stopStandByAnimation,
    startStandByAnimation,
    getPathAnimationDuration,
    getPatternsElementSize,
    getIsLargeScreen,
  }));

  return (
    <div className={cx(classes.root, className)} {...etc}>
      <div
        className={classes.patterns}
        ref={(ref) => {
          patternsElementRef.current = ref;
        }}
      >
        <div
          className={classes.light1}
          ref={(ref) => {
            light1ElementRef.current = ref;
          }}
        />
        <div
          className={classes.line1Container}
          ref={(ref) => {
            line1ContainerRef.current = ref;
          }}
        >
          {Array(line1Length)
            .fill(undefined)
            .map((value, index) => (
              <div key={index} style={{ top: `${index * 10}px` }} className={classes.line1} />
            ))}
        </div>
        <svg
          className={cx(classes.svgContainer, classes.dotLinesContainer)}
          ref={(ref) => {
            dotLinesContainerRef.current = ref;
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {line2ItemsPositions?.map((value: any, index: any) => (
            <line
              className={cx(classes.dotLine, classes.line2)}
              key={index}
              x1={`${value}px`}
              x2={`${value}px`}
              y1="0px"
              y2={`${patternElementHeight}px`}
            />
          ))}
          {line3ItemsPositions?.map((value: any, index: any) => (
            <line
              className={cx(classes.dotLine, classes.line3)}
              key={index}
              x1="0px"
              x2={`${patternElementWidth}px`}
              y1={`${value}px`}
              y2={`${value}px`}
            />
          ))}
        </svg>
        <svg
          className={cx(classes.svgContainer, classes.circuitContainer)}
          ref={(ref) => {
            circuitContainerRef.current = ref;
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {circuitLines?.map((line: any, index: any) => (
            <g className={classes.circuit} key={index} data-index={index}>
              <path
                className={classes.circuitLine}
                d={line.map(([x, y]: any, pIndex: any) => `${pIndex === 0 ? "M" : "L"}${x},${y}`).join(" ")}
              />
              <path
                className={classes.circuitLineLight}
                d={line.map(([x, y]: any, pIndex: any) => `${pIndex === 0 ? "M" : "L"}${x},${y}`).join(" ")}
              />
              <circle
                className={cx(classes.circuitDot, classes.circuitDotStart)}
                cx={`${line[0][0]}px`}
                cy={`${line[0][1]}px`}
                r="3px"
              />
              <circle
                className={cx(classes.circuitDot, classes.circuitDotEnd)}
                cx={`${line[line.length - 1][0]}px`}
                cy={`${line[line.length - 1][1]}px`}
                r="3px"
              />
            </g>
          ))}
        </svg>
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );
});

Component.displayName = "Background";

export { Component };
