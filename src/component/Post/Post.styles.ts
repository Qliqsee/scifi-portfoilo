import { rgba } from "polished";

const styles = (theme: any) => ({
  root: {
    position: "relative",
    display: "block",
    margin: 0,
  },
  lineTop: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    borderTop: "1px solid " + rgba(theme.color.primary.dark, 0.25),
    width: ({ energy }: any) => (energy.animate ? "0%" : "100%"),
  },
  link: {
    display: "flex",
    flexDirection: "column",
    padding: [40, 20],
    transition: ["background 200ms ease-out", "color 200ms ease-out"].join(","),

    "&:hover, &:focus": {
      backgroundColor: ({ energy }: any) => energy.entered && rgba(theme.color.secondary.main, 0.05),
    },
  },
  media: {
    display: "flex",
    margin: [0, "auto"],
    padding: [0, 0, 20, 0],
    width: "100%",
    height: 200,
  },
  image: {
    flex: 1,
    border: "1px solid " + rgba(theme.color.secondary.dark, 0.125),
    backgroundColor: "#000",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  info: {
    flex: 1,
    color: theme.color.text.main,
    wordBreak: "break-word",
  },

  title: {
    fontSize: 20,
    marginBottom: 15,
  },
  description: {
    fontSize: 17,
    textTransform: "capitalize",
    color: "#f1cca5",
    marginBottom: 10,
    fontFamily: "Orbitron, sans-serif",
    fontWeight: 500,
  },
  uri: {
    fontSize: 17,
    textTransform: "lowercase",
    color: "#f1cca5",
    marginBottom: 10,
    fontStyle: "italic",
    textDecoration: "underline",
    cursor: "pointer",
    // fontFamily: "Orbitron, sans-serif",
    // fontWeight: 500,
  },
  message: {
    margin: 0,
  },

  "@media screen and (min-width: 480px)": {
    link: {
      flexDirection: "row",
      padding: 20,
    },
    media: {
      padding: [0, 20, 0, 0],
      width: 180,
      height: 180,
    },
  },

  "@media screen and (min-width: 768px)": {
    link: {
      padding: 40,
    },
  },
});

export { styles };
