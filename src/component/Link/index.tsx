import { withSounds } from "@/hoc/withSounds/withSounds";
import { withStyles } from "@/hoc/withStyles";
import { Component } from "./Link";

// FIXME: remove any
const Link: any = withStyles(() => {})(withSounds()(Component));

export { Link };
