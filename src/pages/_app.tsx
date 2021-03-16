import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import React, { useEffect } from 'react'
import 'styles/tailwind-base.css'
import 'styles/tailwind-fontface.css'
import 'styles/tailwind-globals.css'
import 'styles/tailwind-prism.css'
import 'styles/tailwind-util.css'
import { SITE_DOMAIN, SITE_TITLE } from 'utils/env'
import * as gtag from 'utils/gtag'

nprogress.configure({ showSpinner: false, speed: 200, minimum: 0.25 })

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const router = useRouter()
  process.browser && nprogress.start()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    nprogress.done()
  })

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="alternate" type="application/rss+xml" title="feed" href={`${SITE_DOMAIN}/atom.xml`} />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_TITLE} />
        <meta name="twitter:site" content="@code_shinki" />
        <meta name="twitter:card" content="summary" />
        <meta name="theme-color" content="#2e3440" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={SITE_TITLE} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="192x192" href="/img/favicons/android-chrome-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/img/favicons/apple-touch-icon-180x180.png" />
        <link rel="mask-icon" href="/img/favicons/safari-pinned-tab.svg" color="#eceff4" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
