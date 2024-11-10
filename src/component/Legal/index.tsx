import { withAnimation } from "@/hoc/withAnimation";
import { withStyles } from "@/hoc/withStyles";
import { styles } from "./Legal.styles";
import { withSounds } from "@/hoc/withSounds";
import { Component } from "./Legal";

const Legal: any = withAnimation({ flow: false })(withStyles(styles)(withSounds()(Component)));

export { Legal };
