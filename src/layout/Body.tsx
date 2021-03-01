import ContentsList from 'components/ContentsList'
import ExLinks from 'components/ExLinks'
import Share from 'components/Share'
import Footer from 'layout/Footer'
import Header from 'layout/Header'
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
      <main className="max-w-5xl px-3 sm:px-5 mx-auto">
        {props.children}
        <Share fullPath={props.fullPath} />
        <div className="md:flex justify-around">
          <ContentsList />
          <ExLinks />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Body
