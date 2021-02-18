import { motion } from 'framer-motion'
import { AppProps } from 'next/app'
import Head from 'next/head'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import React, { useEffect } from 'react'
import 'styles/globals.css'

const PAGE_VARIANTS = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
}

nprogress.configure({ showSpinner: false, speed: 200, minimum: 0.25 })

const App = ({ Component, pageProps, router }: AppProps): JSX.Element => {
  if (process.browser) {
    nprogress.start()
  }

  useEffect(() => {
    nprogress.done()
  })

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:type" content="website" />
        <meta name="twitter:site" content="@code_shinki" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="192x192" href="/img/favicons/android-chrome-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/img/favicons/apple-touch-icon-180x180.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileImage" content="/img/favicons/site-tile-150x150.png" />
      </Head>
      <motion.div key={router.route} initial="initial" animate="animate" variants={PAGE_VARIANTS}>
        <Component {...pageProps} />
      </motion.div>
    </>
  )
}

export default App
