import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import Keywords from 'components/organisms/Keywords'
import Share from 'components/organisms/Share'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import React, { useEffect } from 'react'
import 'styles/destyle.scss'
import 'styles/global.scss'
import 'styles/prism.scss'
import 'styles/variables.scss'
import { SITE_DOMAIN, SITE_TITLE } from 'utils/env'
import { pageview } from 'utils/gtag'

nprogress.configure({ showSpinner: false, speed: 200, minimum: 0.25 })

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  // ページ遷移時にプログレスバーを表示
  process.browser && nprogress.start()
  useEffect(() => {
    nprogress.done()
  })

  // ページごとにアナリティクスを計測させる
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  !pageProps.pageProps && <Component {...pageProps} />

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="canonical" href={pageProps.pageProps.url} />
        <title>{pageProps.pageProps.title}</title>
        <meta name="description" content={pageProps.pageProps.description} />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:site_name" content={SITE_TITLE} />
        <meta property="og:type" content={pageProps.pageProps.type === 'home' ? 'website' : 'article'} />
        <meta property="og:url" content={pageProps.pageProps.url} />
        <meta property="og:title" content={pageProps.pageProps.title} />
        <meta property="og:description" content={pageProps.pageProps.description} />
        <meta
          property="og:image"
          content={pageProps.pageProps.thumbnail ? pageProps.pageProps.thumbnail : `${SITE_DOMAIN}/img/og-img.jpg`}
        />
        <meta name="twitter:site" content="@code_shinki" />
        <meta name="twitter:card" content="summary" />
        <meta name="theme-color" content="#4c566a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={SITE_TITLE} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="192x192" href="/img/icons/android-chrome-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/img/icons/apple-touch-icon-180x180.png" />
        <link rel="mask-icon" href="/img/icons/safari-pinned-tab.svg" color="#eceff4" />
        <link rel="alternate" type="application/rss+xml" title="feed" href={`${SITE_DOMAIN}/atom.xml`} />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        {pageProps.pageProps.noindex && <meta name="robots" content="noindex,nofollow" />}
      </Head>
      <Header type={pageProps.pageProps.type} />
      <main>
        <Component {...pageProps} />
      </main>
      <aside>
        <Share url={pageProps.pageProps.url} title={pageProps.pageProps.title} />
        <Keywords keywords={pageProps.pageProps.keywords} />
      </aside>
      <Footer />
    </>
  )
}

export default App
