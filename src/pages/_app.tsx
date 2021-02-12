import { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import 'sanitize.css'
import 'styles/globals.css'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="author" content="Shinki" />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="192x192" href="/img/android-chrome-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon-180x180.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileImage" content="/img/site-tile-150x150.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
