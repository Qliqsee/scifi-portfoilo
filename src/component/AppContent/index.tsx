import { withAnimation } from "@/hoc/withAnimation/withAnimation";
import { withStyles } from "@/hoc/withStyles";
import { Component } from "./AppContent";

const AppContent: any = withAnimation({ flow: false })(withStyles(() => ({}))(Component));

export { AppContent };
