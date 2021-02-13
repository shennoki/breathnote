import Share from 'components/Share'
import Footer from 'layout/Footer'
import Header from 'layout/Header'
import Sidebar from 'layout/Sidebar'
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
