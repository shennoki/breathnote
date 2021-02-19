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
      <main className="container max-w-6xl px-3 sm:px-5 mx-auto">
        {props.children}
        <Share path={props.fullPath} />
        <div className="mt-10 md:mt-16 lg:mt-20 md:flex justify-around items-center">
          <ContentsList />
          <ExLinks />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Body
