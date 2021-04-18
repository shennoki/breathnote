import { randomBytes } from 'crypto'
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { GA_TRACKING_ID } from 'utils/env'

class MyDocument extends Document<{ nonce: string }> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    const nonce = randomBytes(128).toString('base64')
    return { ...initialProps, nonce }
  }

  render(): JSX.Element {
    const nonce = this.props.nonce
    const csp = `object-src 'none'; base-uri 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http: 'nonce-${nonce}' 'strict-dynamic'`

    return (
      <Html lang="ja" prefix="og: https://ogp.me/ns#">
        <Head nonce={nonce}>
          <meta httpEquiv="Content-Security-Policy" content={csp} />
        </Head>
        <body>
          <script src="/noDarkmodeFlash.js" nonce={nonce} />
          <Main />
          <NextScript nonce={nonce} />
          <script src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} nonce={nonce} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","${GA_TRACKING_ID}",{page_path:window.location.pathname});`,
            }}
            nonce={nonce}
          />
        </body>
      </Html>
    )
  }
}

export default MyDocument
