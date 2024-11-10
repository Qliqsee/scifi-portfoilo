import { withAnimation } from "@/hoc/withAnimation/withAnimation";
import { withSounds } from "@/hoc/withSounds/withSounds";
import { withStyles } from "@/hoc/withStyles";
import { styles } from "./styles";
import { Component } from "./Header";

const Header: any = withAnimation()(withStyles(styles)(withSounds()(Component)));

export { Header };
