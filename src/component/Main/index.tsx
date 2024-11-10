import { withStyles } from "@/hoc/withStyles";
import { styles } from "./Main.styles";
import Component from "./Main";

const Main: any = withStyles(styles)(Component);

export { Main };
