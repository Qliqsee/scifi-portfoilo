import { withAnimation } from "@/hoc/withAnimation";
import { withStyles } from "@/hoc/withStyles";
import { styles } from "./Button.styles";
import { withSounds } from "@/hoc/withSounds";
import { Component } from "./Button";

const Button: any = withAnimation()(withStyles(styles)(withSounds()(Component)));

export { Button };
