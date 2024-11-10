import { withAnimation } from "@/hoc/withAnimation";
import { withSounds } from "@/hoc/withSounds";
import { withStyles } from "@/hoc/withStyles";
import { Component } from "./Popup";
import { styles } from "./Popup.styles";

const Popup: any = withAnimation()(withStyles(styles)(withSounds()(Component)));

export { Popup };
