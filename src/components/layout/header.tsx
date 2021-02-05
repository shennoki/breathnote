import Link from 'next/link'
import React, { FC } from 'react'

type Props = {
  pageType: string
}

const Header: FC<Props> = ({ pageType }) => {
  return (
    <header>
      {pageType === 'top' ? (
        <>
          <h1>
            <Link href="/">
              <a>Breath Note</a>
            </Link>
          </h1>
        </>
      ) : (
        <>
          <Link href="/">
            <a>Breath Note</a>
          </Link>
        </>
      )}
    </header>
  )
}

export default Header
