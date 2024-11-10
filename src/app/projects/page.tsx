"use client";

import React from "react";

import { Main } from "@/component/Main";
import { Sequence } from "@/component/Sequence";
import { Text } from "@/component/Text";
import { withStyles } from "@/hoc/withStyles";
import { Post } from "@/component/Post";
import { projects } from "@/data/projects";

const styles = (theme: any) => ({
  root: {},
  seeMore: {
    marginTop: 20,
  },
});

interface Props {
  classes?: any;
}

const Projects = ({ classes }: Props) => {
  return (
    <Main className={classes.root}>
      <Sequence stagger>
        <header>
          <h1>
            <Text>Projects</Text>
          </h1>
        </header>
        {projects.map((project, index) => (
          <Post isProject key={index} audio={{ silent: index > 4 }} data={{ ...project, id: "project" + index }} />
        ))}
      </Sequence>
    </Main>
  );
};

Projects.displayName = "Projects";

export default withStyles(styles)(Projects) as any;
