import React, { useEffect, useRef } from "react";
import cx from "classnames";
import { Header } from "../Header";
import { AppContent } from "../AppContent";
import { Footer } from "../Footer";

interface Props {
  theme?: any;
  classes?: any;
  className?: any;
  children?: any;
}

const Component = ({ theme, classes, children, className, ...etc }: Props) => {
  const headerRef = useRef<any>(null);
  const footerRef = useRef<any>(null);
  const contentElementRef = useRef<any>(null);

  useEffect(() => {
    window.addEventListener("route-change-start", onRouteChangeStart);
    window.addEventListener("route-change", onRouteChange);

    return () => {
      window.removeEventListener("route-change-start", onRouteChangeStart);
      window.removeEventListener("route-change", onRouteChange);
    };
  }, []);

  const onRouteChangeStart = ({ detail: { isInternal, href } }: any) => {
    if (isInternal && href === "/") {
      headerRef.current?.exit();
      footerRef.current?.exit();
    }
  };

  const onRouteChange = () => {
    contentElementRef.current?.scrollTo(0, 0);
  };
  return (
    <div className={cx(classes.root, className)} {...etc}>
      <Header
        origin={"Header-App"}
        className={classes.header}
        ref={(ref: any) => {
          headerRef.current = ref;
        }}
      />
      <div
        className={classes.content}
        ref={(ref) => {
          contentElementRef.current = ref;
        }}
      >
        <AppContent origin={"AppContent-App"}>{children}</AppContent>
        <Footer
          origin={"Footer-App"}
          className={classes.footer}
          ref={(ref: any) => {
            footerRef.current = ref;
          }}
        />
      </div>
    </div>
  );
};

Component.displayName = "App";

export { Component };
