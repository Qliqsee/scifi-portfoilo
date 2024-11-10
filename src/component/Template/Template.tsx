import React, { useEffect, useRef, useState } from "react";
import { Layout } from "../Layout";
import { Background } from "../Background";
import { Popup } from "../Popup";
import { App } from "../App";
import { usePathname } from "next/navigation";
import { theme } from "@/settings/theme";
import { ThemeProvider } from "react-jss";

interface Props {
  location?: any;
  classes?: any;
  layout?: any;
  background?: any;
  children?: any;
}

const Component = React.forwardRef(({ children, classes, layout = {}, background = {} }: Props, ref) => {
  const pathname = usePathname();

  const enterElementRef = useRef<any>(null);

  const [hidden, setHidden] = useState(true);

  const [state, setState] = useState<any>({
    show: false,
    enterShow: false,
    enterAnimationShow: true,
  });

  const { show, enterShow, enterAnimationShow } = state;

  const isURLContent = ["/about", "/experience", "/projects"].find((path) => {
    return pathname.indexOf(path) === 0;
  });

  useEffect(() => {
    setTimeout(() => setState({ ...state, enterShow: true }), theme.animation.time);
  }, []);

  const onEnter = () => {
    setState({ ...state, enterAnimationShow: false });

    setTimeout(() => {
      setState({ ...state, show: true });
    }, theme.animation.time + theme.animation.stagger);
  };

  React.useImperativeHandle(ref, () => ({
    onEnter,
  }));

  useEffect(() => {
    setHidden(false);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Layout origin="Template-Layout" {...layout}>
        {!hidden && (
          <Background origin="Template-Background" {...background} animation={{ show, ...background.animation }}>
            {!show ? null : isURLContent ? <App>{children}</App> : children}

            {!show && (
              <div className={classes.enterOverlay}>
                {enterShow && (
                  <Popup
                    origin="Template-Popup"
                    className={classes.enterElement}
                    ref={(ref: any) => {
                      enterElementRef.current = ref;
                    }}
                    audio={{ silent: true }}
                    animation={{ independent: true, show: enterAnimationShow }}
                    message="Qliqsee.dev uses sounds."
                    option="Enter"
                    onOption={onEnter}
                  />
                )}
              </div>
            )}
          </Background>
        )}
      </Layout>
    </ThemeProvider>
  );
});

Component.displayName = "Template";

export { Component };
