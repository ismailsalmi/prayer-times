import React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import "../styles/globals.css";
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>أذان</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Ismail salmi" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
        <link rel="icon" type="image/png" href="/assets/favicon.png" />
        <link rel="icon" href="/assets/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicon-16x16.png"
        />
        <link rel="manifest" href="/assets/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/assets/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />/{" "}
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
