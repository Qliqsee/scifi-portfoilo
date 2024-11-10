/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";

import { Main } from "@/component/Main";
import { Sequence } from "@/component/Sequence";
import { Text } from "@/component/Text";
import { withStyles } from "@/hoc/withStyles";
import { Fader } from "@/component/Fader";
import styled from "@emotion/styled";
import Image from "next/image";
import imageUrl from "@/images/qliqsee.jpg";

const styles = (theme: any) => ({
  root: {},
});

interface Props {
  classes?: any;
}

const StyledImage = styled(Image)`
  margin: auto;
  height: auto;
  max-height: 360px;
  object-fit: cover;
  width: 100%;
  object-position: 5px 20%;

  @media screen and (min-width: 769px) {
    width: 100%;
    margin: auto;
    object-fit: cover;
  }
`;

const Component = ({ classes }: Props) => {
  return (
    <Main className={classes.root}>
      <article>
        <Sequence stagger>
          <header>
            <h1>
              <Text>About</Text>
            </h1>
          </header>
          <p>
            <Text>
              Passionate Software Engineer with 5+ years of experience developing web applications and UI tools across industries
              such as education, real estate, bookkeeping, social networking, and e-commerce. Known for a meticulous approach to
              clean, modular, and testable code, I prioritise maintainability and scalability, ensuring solutions that stand the
              test of time. Constantly evolving with advancements in both client- and server-side technologies, I am committed to
              delivering reliable, future-proof applications that blend technical rigour with creative vision.
            </Text>
          </p>
          <Fader isAboutPhotoFader node="div">
            <StyledImage src={imageUrl} alt="Qliqsee's photo" />
          </Fader>

          <p>
            <Text>
              With a comprehensive skill set across both front-end and back-end development, I am proficient in Angular and React
              (Next.js), creating responsive and engaging user interfaces that excel in performance and accessibility. My back-end
              expertise includes extensive work with Express (NestJS) for enterprise-grade, server-side development, as well as
              some hands on experience with .NET. This versatility enables me to architect full-stack solutions that seamlessly
              connect intuitive, dynamic front ends with powerful, efficient server layers.
            </Text>
          </p>

          <Fader>
            <p>
              Experienced with cloud platforms including Microsoft Azure, Google Cloud Platform (GCP), Amazon Web Services (AWS),
              and DigitalOcean, I leverage their full range of services for cloud-based deployment, ensuring scalability,
              security, and streamlined CI/CD workflows. I am skilled in crafting and optimizing RESTful and GraphQL APIs and have
              a solid foundation in both relational and NoSQL databases, allowing for adaptable data solutions aligned with
              project needs.
            </p>
            <p>
              Driven by a passion for sci-fi and fantasy, I bring a unique, imaginative perspective to app design, weaving
              elements of storytelling and world-building into my UI/UX approach. Inspired by the aesthetics and depth of these
              genres, I aim to craft digital experiences that are as visually captivating as they are functionally robust,
              delivering applications that resonate with users on multiple levels.{" "}
            </p>
          </Fader>
        </Sequence>
      </article>
    </Main>
  );
};

Component.displayName = "About";
export default withStyles(styles)(Component) as any;
