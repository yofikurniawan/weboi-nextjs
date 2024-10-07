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
        <link rel="icon" href="/img/logo/fav.svg" />
      </Head>
      <Script
        src="https://website-widgets.pages.dev/dist/sienna.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"
        strategy="beforeInteractive"
      />
      <Script src="/js/bootstrap.bundle.min.js" strategy="lazyOnload" />
      <Script src="/js/swiper.min.js" strategy="lazyOnload" />
      <Script src="/js/wow.min.js" strategy="lazyOnload" />
      <Script src="/js/appear.js" strategy="lazyOnload" />
      <Script src="/js/odometer.min.js" strategy="lazyOnload" />
      <Script src="/js/jquery.nice-select.min.js" strategy="lazyOnload" />
      <Script src="/js/imagesloaded.pkgd.min.js" strategy="lazyOnload" />
      <Script src="/js/isotope.pkgd.min.js" strategy="lazyOnload" />
      <Script src="/js/jquery.magnific-popup.min.js" strategy="lazyOnload" />
      <Script src="/js/main.js" strategy="lazyOnload" />
      <Script src="/vendor/apex_chart/apexcharts.js" strategy="lazyOnload" />
      <Script
        async
        src="https://www.instagram.com/embed.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/apexsankey"
        strategy="lazyOnload"
      />
      <Script src="/js/apexchart.js" strategy="lazyOnload" />
      <Script src="/exmaple/map.js" strategy="lazyOnload" />

      {getLayout(<Component {...pageProps} />)}
    </>
  );
}
