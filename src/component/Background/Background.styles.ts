import { rgba, lighten } from "polished";

const styles = ({ color }: any) => ({
  positioned: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  root: {
    composes: "$positioned",
    position: "fixed",
    zIndex: 0,
    backgroundColor: color.background.dark,
  },
  patterns: {
    composes: "$positioned",
    zIndex: 0,
  },
  light1: {
    composes: "$positioned",
    zIndex: 0,
    backgroundImage: "radial-gradient(" + rgba("red", 0.1) + " 25%, transparent)",
    opacity: (props: any) => (props.energy.entered ? 1 : 0),
  },
  line1Container: {
    composes: "$positioned",
    zIndex: 1,
  },
  line1: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#301403",
    boxShadow: `0 0 1px ${rgba("#301403", color.alpha)}`,
    opacity: (props: any) => (props.energy.entered ? 1 : 0),
  },
  svgContainer: {
    composes: "$positioned",
    zIndex: 2,
    display: "block",
    width: "100%",
    height: "100%",
  },
  dotLinesContainer: {
    opacity: (props: any) => (props.energy.exited ? 0 : 1),
  },
  dotLine: {
    stroke: color.background.light,
    strokeWidth: 1,
  },
  line2: {},
  line3: {},
  circuitContainer: {},
  circuit: {
    opacity: (props: any) => (props.energy.exited ? 0 : 1),
  },
  circuitLine: {
    fill: "none",
    stroke: color.background.light,
    strokeWidth: 1,
  },
  circuitLineLight: {
    fill: "none",
    stroke: "#cccccc",
    strokeWidth: 1,
    opacity: 0,
  },
  circuitDot: {
    fill: lighten(color.accent / 4, color.background.light),
    opacity: (props: any) => (props.energy.entered ? 1 : 0),
  },
  circuitDotStart: {},
  circuitDotEnd: {},
  content: {
    composes: "$positioned",
    zIndex: 1,
    display: "flex",
  },
});

export { styles };
