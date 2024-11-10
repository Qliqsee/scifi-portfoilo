import { withAnimation } from "@/hoc/withAnimation/withAnimation";
import { withStyles } from "@/hoc/withStyles";
import { styles } from "./Menu.styles";
import { withSounds } from "@/hoc/withSounds/withSounds";
import { Component } from "./Menu";

const Menu: any = withAnimation()(withStyles(styles)(withSounds()(Component)));

export { Menu };
