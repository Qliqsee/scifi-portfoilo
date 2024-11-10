"use client";

import React, { useRef } from "react";

import { Sequence } from "@/component/Sequence";
import { withStyles } from "@/hoc/withStyles";
import { Brand } from "@/component/Brand";
import { Menu } from "@/component/Menu";
import { SocialLinks } from "@/component/SocialLinks";

const styles = (theme: any) => {
  return {
    root: {
      margin: "auto",
      width: "100%",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      margin: [0, "auto"],
      padding: 20,
    },
    brand: {
      margin: [0, "auto", 30],
      padding: [10, 0],
      width: "100%",
      maxWidth: 700,
    },
    menu: {
      margin: [0, "auto", 20],
      width: "100%",
      maxWidth: 600,
    },
    social: {
      margin: [0, "auto"],
      width: "100%",
      maxWidth: 400,
    },
    legal: {
      position: "absolute",
      left: "50%",
      bottom: 0,
      transform: "translateX(-50%)",
    },
  };
};

interface Props {
  classes?: any;
}

const Component = ({ classes }: Props) => {
  const sequenceElementRef = useRef<any>(null);

  const onLinkStart = (event: any, { isInternal }: any) => {
    if (isInternal) {
      sequenceElementRef.current?.exit();
    }
  };
  return (
    <Sequence
      ref={(ref: any) => {
        sequenceElementRef.current = ref;
      }}
    >
      <div className={classes.root}>
        <div className={classes.content}>
          <Brand className={classes.brand} onLinkStart={onLinkStart} />
          <Menu className={classes.menu} animation={{ duration: { enter: 400 } }} scheme="expand" onLinkStart={onLinkStart} />
          <SocialLinks className={classes.social} onLinkStart={onLinkStart} />
        </div>
      </div>
    </Sequence>
  );
};

Component.displayName = "index";

export default withStyles(styles)(Component) as any;
