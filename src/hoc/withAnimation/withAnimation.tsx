"use client";

import React, { useEffect, useRef } from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

import { useAnimationContext } from "@/context/Animation/Animation.context";
import { Animation } from "@/component/Animation";

interface InsideAnimationProps {
  forwardedRef?: any;
  [key: string]: any;
}

interface WithAnimationInsideProps {
  animation?: any;
  [key: string]: any;
}
interface withAnimationProps {
  flow?: boolean;
  [key: string]: any;
}

function withAnimation(providedOptions?: withAnimationProps) {
  const options = {
    flow: true,
    ...providedOptions,
  };

  return (Inner: any) => {
    const InsideAnimation = (props: InsideAnimationProps) => {
      const { forwardedRef, ...etc } = props;

      const context = useAnimationContext();
      const prevContext = useRef(context);

      const innerRef = useRef<any>(null);

      useEffect(() => {
        flow();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      useEffect(() => {
        // any time the component is updated..
        const prevStatus = prevContext.current?.status;
        const currentStatus = context?.status;

        const origin = etc?.origin;
        if (origin === "Popup-Text") {
        }

        if (prevStatus !== currentStatus) {
          // if the status has changed call flow
          flow();
        }

        // update prevContext to be current context
        prevContext.current = context;
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [context, props]);

      function flow() {
        // set energy to be current context
        const energy = context;

        // if options. flow is false do nothing and return
        if (!options.flow) {
          return;
        }

        // if
        if (!innerRef.current?.enter || !innerRef.current?.exit) {
          alert('Provided animated component needs to have methods "enter" and "exit".');
          throw new Error('Provided animated component needs to have methods "enter" and "exit".');
        }

        if (energy?.entering) {
          innerRef.current?.enter();
        } else if (energy?.exiting) {
          innerRef.current?.exit();
        }
      }

      const onRef = (ref: any) => {
        innerRef.current = ref;

        if (forwardedRef) {
          // TODO:confrim that this works
          forwardedRef(ref);
        }
      };

      return <Inner {...etc} ref={onRef} energy={context} />;
    };

    const WithAnimationInside = ({ animation, forwardedRef, ...etc }: WithAnimationInsideProps) => {
      const onRef = (ref: any, innerRef?: React.MutableRefObject<any>) => {
        if (innerRef) innerRef.current = ref;

        if (forwardedRef) {
          // TODO:confrim that this works
          forwardedRef(ref);
        }
      };

      return (
        <Animation origin={etc?.origin} {...etc} ref={onRef} {...animation}>
          <InsideAnimation {...etc} forwardedRef={forwardedRef} />
        </Animation>
      );
    };

    const WithAnimation = React.forwardRef((props, ref) => {
      //  when WithAnimation component renders it returns WithAnimationInside component that is rendered with forwarded ref and props
      return <WithAnimationInside {...props} forwardedRef={ref} />;
    });

    return hoistNonReactStatics(WithAnimation, Inner);
  };
}

export { withAnimation };
