import Link from 'next/link'
import React, { FC } from 'react'

type Props = {
  pageType: string
}

const Header: FC<Props> = ({ pageType }) => {
  return (
    <header>
      {pageType === 'home' ? (
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
      <div>
        <Link href="/categories">
          <a>Categories</a>
        </Link>
        <Link href="/tags">
          <a>Tags</a>
        </Link>
      </div>
    </header>
  )
}

export default Header
