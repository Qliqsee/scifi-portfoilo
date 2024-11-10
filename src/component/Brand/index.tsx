import { withSounds } from "@/hoc/withSounds/withSounds";
import { Component } from "./Brand";
import { withStyles } from "@/hoc/withStyles";
import { withAnimation } from "@/hoc/withAnimation/withAnimation";
import { styles } from "./Brand.styles";

const Brand: any = withAnimation()(withStyles(styles)(withSounds()(Component)));

export { Brand };
