import { withAnimation } from "@/hoc/withAnimation/withAnimation";
import { withStyles } from "@/hoc/withStyles";
import { styles } from "./Background.styles";
import { withSounds } from "@/hoc/withSounds/withSounds";
import { Component } from "./Background";

const Background = withAnimation()(withStyles(styles)(withSounds()(Component)));

export { Background };
