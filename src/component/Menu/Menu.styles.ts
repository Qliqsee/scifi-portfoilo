import { SCHEME_EXPAND } from "./Menu.constants";

const styles = (theme: any) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: [0, "auto"],
    userSelect: "none",
  },
  item: {
    display: "block",
    padding: [10, 0, 10],
    width: "100%",
    lineHeight: 1,
    fontSize: 14,
    textAlign: "center",
    textTransform: "uppercase",
    textShadow: `0 0 5px ${theme.color.secondary.main}`,
    fontFamily: theme.typography.primary,
    color: theme.color.text.main,
    whiteSpace: "nowrap",
  },
  divisor: {
    display: "none",
    width: 0,
    color: theme.color.tertiary.main,
    textShadow: `0 0 5px ${theme.color.tertiary.main}`,
    fontWeight: "normal",
    transform: "scale(1, 0)",
    transformOrigin: "center center",
  },
  link: {
    overflow: "hidden",
    opacity: ({ scheme }: any) => (scheme === SCHEME_EXPAND ? 0 : 1),

    "&.link-active": {
      color: theme.color.tertiary.main,
      textShadow: `0 0 5px ${theme.color.tertiary.main}`,
    },
    "&:hover": {
      color: "#f1cca5",
      textShadow: `0 0 5px ${theme.color.secondary.light}`,
    },

    "&:focus": {
      color: theme.color.tertiary.main,
      textShadow: `0 0 5px ${theme.color.secondary.light}`,
    },
  },

  "@media (min-width: 768px)": {
    item: {
      display: "block",
    },
    divisor: {
      display: "block",
    },
  },
});

export { styles };
