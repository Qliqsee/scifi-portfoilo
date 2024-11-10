import { withAnimation } from "@/hoc/withAnimation";
import { withStyles } from "@/hoc/withStyles";
import { Component } from "./Sequence";

export const Sequence: any = withAnimation()(withStyles(() => ({}))(Component));
