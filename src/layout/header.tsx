import ToggleDarkMode from 'components/ToggleDarkMode'
import Link from 'next/link'
import React, { FC } from 'react'
import styles from 'styles/layout/Header.module.css'

type Props = {
  pageType: string
}

const Header: FC<Props> = (props) => {
  return (
    <header className="container max-w-6xl px-3 sm:px-5 py-6 md:py-9 lg:py-12 mx-auto flex flex-wrap justify-between items-center">
      {props.pageType === 'home' ? (
        <>
          <h1 className={`text-2xl sm:text-3xl ${styles.yurayura} ${styles.textShadow}`}>
            <Link href="/">
              <a>
                <span className="text-blue-400 dark:text-yellow-400 transition-my-colors">B</span>reath Note
              </a>
            </Link>
          </h1>
        </>
      ) : (
        <>
          <div className={`text-2xl sm:text-3xl ${styles.yurayura} ${styles.textShadow}`}>
            <Link href="/">
              <a>
                <span className="text-blue-400 dark:text-yellow-400 transition-my-colors">B</span>reath Note
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
