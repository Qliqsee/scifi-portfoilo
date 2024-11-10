import { withAnimation } from "@/hoc/withAnimation";
import { withStyles } from "@/hoc/withStyles";
import { styles } from "./Post.styles";
import { withSounds } from "@/hoc/withSounds";
import { Component } from "./Post";

const Post: any = withAnimation()(withStyles(styles)(withSounds()(Component)));

export { Post };
