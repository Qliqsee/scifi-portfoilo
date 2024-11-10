import hoistNonReactStatics from "hoist-non-react-statics";
import React from "react";
import injectStyles from "react-jss";

interface InsideStylesProps {
  forwardedRef?: any;
  [key: string]: any;
}

function withStyles(styles: any) {
  return (Inner: any) => {
    const InsideStyles = ({ forwardedRef, ...etc }: InsideStylesProps) => {
      return <Inner {...etc} ref={forwardedRef} />;
    };

    InsideStyles.displayName = `InsideStyles-${Inner.displayName || Inner.name || "Component"}`;

    const WithStylesInside = injectStyles(styles)(InsideStyles);

    const WithStyles = React.forwardRef((props, ref) => <WithStylesInside {...props} forwardedRef={ref} />);

    WithStyles.displayName = `WithStyles(${Inner.displayName || Inner.name || "Component"})`;

    return hoistNonReactStatics(WithStyles, Inner);
  };
}

export { withStyles };
