import Share from 'components/share'
import Footer from 'layout/footer'
import Header from 'layout/header'
import Sidebar from 'layout/sidebar'
import { NextPage } from 'next'
import React, { ReactNode } from 'react'
import { ConfigType } from 'types'

type Props = {
  children: ReactNode
  config: ConfigType
  pageType: string
  fullPath: string
}

const Body: NextPage<Props> = ({ children, pageType, fullPath }) => {
  return (
    <>
      <Header pageType={pageType} />
      <main>
        <Share path={fullPath} />
        {children}
        <Sidebar />
      </main>
      <Footer />
    </>
  )
}

export default Body
