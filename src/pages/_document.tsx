import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
