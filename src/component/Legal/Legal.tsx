import React from "react";
import cx from "classnames";
import { Link } from "../Link";
import { Text } from "../Text";

interface Props {
  // theme?: any;
  classes?: any;
  energy?: any;
  audio?: any;
  sounds?: any;
  className?: any;
  opaque?: any;
  onLinkStart?: any;
  onLinkEnd?: any;
}

const Component = ({ classes, energy, audio, sounds, className, opaque, onLinkStart, onLinkEnd, ...etc }: Props) => {
  const show = energy.entering || energy.entered;
  const { animate, duration } = energy;

  return (
    <p className={cx(classes.root, className)} {...etc}>
      <Text animation={{ animate, show, duration }} stableTime>
        — The better part of Valour, is Discretion. —
      </Text>
    </p>
  );
};

Component.displayName = "Legal";

export { Component };
