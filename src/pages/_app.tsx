import React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import "../styles/globals.css";
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
        <title>أذان</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
