"use client";
import React, { useImperativeHandle, useRef } from "react";

import { Sequence } from "@/component/Sequence";
import { Text } from "@/component/Text";
import { withStyles } from "@/hoc/withStyles";
import { Link } from "@/component/Link";
import { Button } from "@/component/Button";

const styles = (theme: any) => ({
  root: {
    flex: 1,
    display: "flex",
    padding: 20,
  },
  main: {
    margin: "auto",
    textAlign: "center",
  },
});

interface Props {
  classes?: any;
}

const NotFound = React.forwardRef(({ classes }: Props, ref) => {
  const sequenceElementRef = useRef<any>(null);

  const onStart = () => {
    sequenceElementRef.current?.exit();
  };

  React.useImperativeHandle(ref, () => ({
    onStart,
  }));

  return (
    <div className={classes.root}>
      <main className={classes.main}>
        <Sequence
          ref={(ref: any) => {
            sequenceElementRef.current = ref;
          }}
        >
          <h1>
            <Text>Not found</Text>
          </h1>
          <p>
            <Text>The location you are looking for was not found in the system.</Text>
          </p>
          <Link href="/">
            <Button onClick={onStart}>Go to Start</Button>
          </Link>
        </Sequence>
      </main>
    </div>
  );
});

NotFound.displayName = "not found";

export default withStyles(styles)(NotFound) as any;
