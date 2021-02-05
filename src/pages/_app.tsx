import { AppProps } from 'next/app'
import React, { ReactNode } from 'react'
import 'styles/globals.scss'

const App = ({ Component, pageProps }: AppProps): ReactNode => {
  return <Component {...pageProps} />
}

export default App
