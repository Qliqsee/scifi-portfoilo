import { withAnimation } from "@/hoc/withAnimation";
import { withStyles } from "@/hoc/withStyles";
import { styles } from "./Fader.styles";
import { withSounds } from "@/hoc/withSounds";
import { Component } from "./Fader";

const Fader: any = withAnimation()(withStyles(styles)(withSounds()(Component)));

export { Fader };
