import { randomBytes } from 'crypto'
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

type Props = {
  nonce: string
}

class MyDocument extends Document<Props> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    const nonce = randomBytes(128).toString('base64')
    return {
      ...initialProps,
      nonce,
    }
  }

  render(): JSX.Element {
    const nonce = this.props.nonce
    const csp = `object-src 'none'; base-uri 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http: 'nonce-${nonce}' 'strict-dynamic'`

    return (
      <Html lang="ja">
        <Head nonce={nonce}>
          <meta httpEquiv="Content-Security-Policy" content={csp} />
        </Head>
        <body>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    )
  }
}

export default MyDocument
