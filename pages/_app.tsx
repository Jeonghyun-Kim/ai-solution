/* eslint-disable @typescript-eslint/no-explicit-any */
import '@assets/main.css';
import 'nprogress/nprogress.css';

import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import { SWRConfig } from 'swr';

import { Layout } from '@components/core';
import ManagedUIContext from '@components/ui/context';
import fetcher from '@lib/fetcher';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 500,
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="text/javascript" src="/js/redirectIE.js" />
      </Head>
      <ManagedUIContext>
        <SWRConfig value={{ fetcher }}>
          <Layout variant={(Component as any).variant}>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </ManagedUIContext>
    </>
  );
};

export default App;
