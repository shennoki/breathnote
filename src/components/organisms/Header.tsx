import GlobalNavigation from 'components/molecules/GlobalNavigation'
import Link from 'next/link'
import React from 'react'
import styles from './Header.module.scss'

type Props = {
  type: string
}

const Header: React.FC<Props> = ({ type }) => {
  return (
    <header className={styles.header}>
      {type === 'home' ? (
        <h1 className={`${styles.logo} ${styles.wave}`}>
          <Link href="/">
            <a>
              <img src="/img/logo-light.svg" alt="BreathNote" />
            </a>
          </Link>
        </h1>
      ) : (
        <div className={`${styles.logo} ${styles.wave}`}>
          <Link href="/">
            <a>
              <img src="/img/logo-light.svg" alt="BreathNote" />
            </a>
          </Link>
        </div>
      )}
      <GlobalNavigation />
    </header>
  )
}

export default Header
