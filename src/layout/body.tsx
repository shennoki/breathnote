import Share from 'components/share'
import Footer from 'layout/footer'
import Header from 'layout/header'
import Sidebar from 'layout/sidebar'
import React, { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
  pageType: string
  fullPath: string
}

const Body: FC<Props> = (props) => {
  return (
    <>
      <Header pageType={props.pageType} />
      <main>
        <Share path={props.fullPath} />
        {props.children}
        <Sidebar />
      </main>
      <Footer />
    </>
  )
}

export default Body
