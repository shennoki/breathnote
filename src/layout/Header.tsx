import ToggleDarkMode from 'components/ToggleDarkMode'
import Link from 'next/link'
import React, { FC } from 'react'

type Props = {
  pageType: string
}

const Header: FC<Props> = (props) => {
  return (
    <header className="max-w-5xl px-3 sm:px-5 py-6 md:py-9 lg:py-12 mx-auto flex justify-between items-center">
      {props.pageType === 'home' ? (
        <>
          <h1 className={`text-2xl sm:text-3xl textShadow wave`}>
            <Link href="/">
              <a>
                <span className="text-accent-light dark:text-accent-dark">B</span>reath Note
              </a>
            </Link>
          </h1>
        </>
      ) : (
        <>
          <div className={`text-2xl sm:text-3xl textShadow wave`}>
            <Link href="/">
              <a>
                <span className="text-accent-light dark:text-accent-dark">B</span>reath Note
              </a>
            </Link>
          </div>
        </>
      )}
      <ToggleDarkMode />
    </header>
  )
}

export default Header
