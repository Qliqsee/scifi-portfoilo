import { withAnimation } from "@/hoc/withAnimation";
import { withStyles } from "@/hoc/withStyles";
import { styles } from "./SocialLinks.styles";
import { withSounds } from "@/hoc/withSounds";
import { Component } from "./SocialLinks";

const SocialLinks: any = withAnimation()(withStyles(styles)(withSounds()(Component)));

export { SocialLinks };
