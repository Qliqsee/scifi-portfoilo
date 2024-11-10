import React, { useRef } from "react";
import cx from "classnames";
import anime from "animejs";

import { Text } from "../Text";
import { Sequence } from "../Sequence";
import { Fader } from "../Fader";

interface Props {
  // theme?: any;
  classes?: any;
  energy?: any;
  audio?: any;
  sounds?: any;
  className?: any;
  children?: any;
  isProject?: boolean;
  data?: {
    title?: any;
    message?: any;
    link?: any;
    image?: any;
    description?: any;
    uri?: string;
  };
}

const Component = React.forwardRef(
  ({ className, isProject, classes, energy, audio, sounds, children, data, ...etc }: Props, ref) => {
    const lineTopElRef = useRef<any>(null);

    const messageTexts = data?.message.split("\n").map((fragment: any, index: any) => (
      <React.Fragment key={index}>
        {index !== 0 && <br />}
        <Text audio={audio}>{fragment}</Text>
      </React.Fragment>
    ));

    function enter() {
      const duration = energy.duration.enter;

      sounds.deploy && sounds.deploy.play();

      anime({
        targets: lineTopElRef.current,
        duration: duration,
        easing: "easeOutCubic",
        width: ["0%", "100%"],
        complete: () => sounds.deploy && sounds.deploy.stop(),
      });
    }

    function exit() {
      const duration = energy.duration.exit;

      sounds.deploy && sounds.deploy.play();

      anime({
        targets: lineTopElRef.current,
        duration: duration,
        easing: "easeOutCubic",
        width: ["100%", "0%"],
        complete: () => sounds.deploy && sounds.deploy.stop(),
      });
    }

    React.useImperativeHandle(ref, () => ({
      enter,
      exit,
    }));

    return (
      <article className={cx(classes.root, className)} {...etc}>
        <div
          className={classes.lineTop}
          ref={(ref) => {
            lineTopElRef.current = ref;
          }}
        />
        <Sequence stagger>
          <span className={classes.link} onMouseEnter={() => sounds.hover && energy.entered && sounds.hover.play()}>
            <div className={classes.info}>
              <h1 className={classes.title}>
                <Text audio={audio}>{data?.title}</Text>
              </h1>

              <p className={classes.description}>{data?.description}</p>
              {Boolean(data?.uri) && (
                <p>
                  <a className={classes.uri} target="_blank" href={data?.uri}>
                    {data?.uri}
                  </a>
                </p>
              )}
              <p className={classes.message}>{messageTexts}</p>
            </div>
          </span>
        </Sequence>
      </article>
    );
  }
);

Component.displayName = "Post";

export { Component };
