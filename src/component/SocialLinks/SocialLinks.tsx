import React, { useRef } from "react";
import cx from "classnames";

import { Link } from "../Link";
import anime from "animejs";
import { Facebook, GitHub, Instagram, MailOutline, X } from "@mui/icons-material";

interface Props {
  // theme?: any;
  classes?: any;
  energy?: any;
  audio?: any;
  sounds?: any;
  className?: any;
  itemClassName?: any;
  animateY?: any;
  onEnter?: any;
  onExit?: any;
  onLinkStart?: any;
  onLinkEnd?: any;
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
      itemClassName,
      animateY = true,
      onEnter,
      onExit,
      onLinkStart,
      onLinkEnd,
      ...etc
    }: Props,
    ref
  ) => {
    const elementRef = useRef<any>(null);

    function enter() {
      const { duration } = energy;

      // sounds.fade.play();

      anime({
        targets: elementRef.current,
        easing: "easeOutCubic",
        keyframes: [
          { opacity: 1, duration: duration.enter / 3 },
          { opacity: 0, duration: duration.enter / 5 },
          { opacity: 1, duration: duration.enter / 2 },
        ],
        complete: () => onEnter && onEnter(),
      });

      if (animateY) {
        anime({
          targets: elementRef.current,
          easing: "easeOutCubic",
          translateY: [-10, 0],
          duration: duration.enter,
        });
      }
    }

    function exit() {
      const { duration } = energy;

      // sounds.fade.play();

      anime({
        targets: elementRef.current,
        easing: "easeOutCubic",
        keyframes: [
          { opacity: 0, duration: duration.exit / 3 },
          { opacity: 1, duration: duration.exit / 5 },
          { opacity: 0, duration: duration.exit / 2 },
        ],
        complete: () => onExit && onExit(),
      });
    }

    React.useImperativeHandle(ref, () => ({
      enter,
      exit,
    }));

    const A = (elprops: any) => (
      <Link
        className={cx(classes.item, itemClassName)}
        onLinkStart={onLinkStart}
        onLinkEnd={onLinkEnd}
        onMouseEnter={() => sounds.hover.play()}
        {...elprops}
      />
    );
    return (
      <div
        className={cx(classes.root, className)}
        ref={(ref) => {
          elementRef.current = ref;
        }}
        {...etc}
      >
        <A href="https://github.com/Qliqsee" title="Github" target="github">
          <GitHub />
        </A>
        <A href="https://x.com/agboola_iyanu" title="Twitter" target="twitter">
          <X />
        </A>
        <A href="https://www.instagram.com/qliqsee" title="Instagram" target="instagram">
          <Instagram />
        </A>
        <A href="mailto:agboolasolomoniyanu@gmail.com" title="Email" target="email">
          <MailOutline />
        </A>
      </div>
    );
  }
);

Component.displayName = "SocialLink";

export { Component };
