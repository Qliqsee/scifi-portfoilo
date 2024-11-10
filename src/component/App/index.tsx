import { withStyles } from "@/hoc/withStyles";
import { styles } from "./App.styles";
import { Component } from "./App";

const App: any = withStyles(styles)(Component);

export { App };
