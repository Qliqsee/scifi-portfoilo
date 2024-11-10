"use client";

import React from "react";

import { Main } from "@/component/Main";
import { Sequence } from "@/component/Sequence";
import { Text } from "@/component/Text";
import { withStyles } from "@/hoc/withStyles";
import { Post } from "@/component/Post";
import { workExperience } from "@/data/workExperience";

const styles = (theme: any) => ({
  root: {},
  seeMore: {
    marginTop: 20,
  },
});

interface Props {
  classes?: any;
}

const Experience = ({ classes }: Props) => {
  return (
    <Main className={classes.root}>
      <Sequence stagger>
        <header>
          <h1>
            <Text>Experience</Text>
          </h1>
        </header>
        {workExperience.map((exp, index) => (
          <Post key={index} audio={{ silent: index > 4 }} data={{ ...exp, id: "experience" + index }} />
        ))}
      </Sequence>
    </Main>
  );
};

Experience.displayName = "Experience";

export default withStyles(styles)(Experience) as any;
