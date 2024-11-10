import React, { useEffect, useRef } from "react";
import cx from "classnames";

import { Fader } from "../Fader";

interface Props {
  // theme?: any;
  classes?: any;
  className?: any;
  children?: any;
}

const Component = ({ classes, className, children, ...etc }: Props) => {
  const elementRef = useRef<any>(null);

  useEffect(() => {
    window.addEventListener("route-change-start", onRouteChangeStart);

    return () => {
      window.removeEventListener("route-change-start", onRouteChangeStart);
    };
  }, []);

  const onRouteChangeStart = ({ detail: { isInternal } }: any) => {
    if (isInternal) {
      elementRef.current?.exit();
    }
  };

  return (
    <Fader
      className={cx(classes.root, className)}
      node="main"
      ref={(ref: any) => {
        elementRef.current = ref;
      }}
      {...etc}
    >
      <div className={classes.frame} />
      <div className={classes.content}>{children}</div>
    </Fader>
  );
};
Component.displayName = "Main";

export default Component;
