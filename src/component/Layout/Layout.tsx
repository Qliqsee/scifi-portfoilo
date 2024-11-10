/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/google-font-display */
/* eslint-disable @next/next/no-page-custom-font */
import React from "react";
import Helmet from "react-helmet";

import { meta } from "@/settings/meta";
import { SoundsProvider } from "../Providers/SoundsProvider";
import { sounds } from "@/settings/sounds";

const Component = ({ children }: { children: any }) => {
  return (
    <>
      <Helmet>
        <html lang="en" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />

        <meta name="robots" content="index, follow" />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />

        <meta property="og:title" content={meta.title} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={meta.url} />
        <meta property="og:image" content={meta.seoImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:site" content={meta.twitter} />
        <meta name="twitter:creator" content={meta.twitter} />
        <meta name="twitter:image" content={meta.seoImage} />

        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content={meta.color} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content={meta.title} />
        <meta name="apple-mobile-web-app-status-bar-style" content={meta.color} />
        <meta name="msapplication-TileColor" content={meta.color} />

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Orbitron:400,500,700|Electrolize" />
        <link rel="stylesheet" href="//cdn.materialdesignicons.com/3.0.39/css/materialdesignicons.min.css" />
      </Helmet>
      <SoundsProvider sounds={sounds}>{children}</SoundsProvider>
    </>
  );
};

Component.displayName = "Layout";

export { Component };
