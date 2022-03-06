import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import Keywords from 'components/organisms/Keywords'
import Share from 'components/organisms/Share'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import React, { useEffect } from 'react'
import 'styles/destyle.scss'
import 'styles/global.scss'
import 'styles/utils/prism.scss'
import 'styles/variables.scss'
import { GA_TRACKING_ID, SITE_DOMAIN, SITE_TITLE } from 'utils/env'

nprogress.configure({ showSpinner: false, speed: 200, minimum: 0.25 })

const App = ({ Component, pageProps }: AppProps) => {
  // ページ遷移時にプログレスバーを表示
  typeof window !== 'undefined' && nprogress.start()
  useEffect(() => {
    nprogress.done()
  })

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
        <meta name="twitter:site" content="@_shinnoki" />
        <meta name="twitter:card" content="summary" />
        <meta name="theme-color" content="#4c566a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={SITE_TITLE} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="192x192" href="/img/icon/android-chrome-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/img/icon/apple-touch-icon-180x180.png" />
        <link rel="mask-icon" href="/img/icon/safari-pinned-tab.svg" color="#eceff4" />
        <link rel="alternate" type="application/rss+xml" title="feed" href={`${SITE_DOMAIN}/atom.xml`} />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        {pageProps.pageProps.noindex && <meta name="robots" content="noindex,nofollow" />}
        <link rel="preload" href="/font/Spica-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/font/Spica-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
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
      {GA_TRACKING_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
          `}
          </Script>
        </>
      )}
    </>
  )
}

export default App
