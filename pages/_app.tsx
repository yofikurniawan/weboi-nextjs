/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

import "../styles/globals.css";
import DefaultLayout from "../components/Layouts/DefaultLayout";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <>
      <Head>
        <title>WEB KABUPATEN OGAN ILIR</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Website Kabupaten Ogan Ilir" />
        <link rel="icon" href="/images/logo/fav.svg" />
      </Head>
      <Script
        src="https://website-widgets.pages.dev/dist/sienna.min.js"
        strategy="beforeInteractive"
      />
      <Script src="/js/bootstrap.bundle.min.js" strategy="lazyOnload" /> 
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}
