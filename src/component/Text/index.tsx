import { withSounds } from "@/hoc/withSounds/withSounds";
import { Component } from "./Text";
import { withAnimation } from "@/hoc/withAnimation/withAnimation";
import { styles } from "./Text.styles";
import { withStyles } from "@/hoc/withStyles";

// FIXME
const Text: any = withStyles(styles)(withAnimation()(withSounds()(Component)));

export { Text };
