import { withAnimation } from "@/hoc/withAnimation";
import { withStyles } from "@/hoc/withStyles";
import { styles } from "./Footer.styles";
import { withSounds } from "@/hoc/withSounds";
import { Component } from "./Footer";

const Footer: any = withAnimation()(withStyles(styles)(withSounds()(Component)));

export { Footer };
