import GlobalNavigation from 'components/molecules/GlobalNavigation'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './Header.module.scss'
import imgSrc from '/public/img/logo-light.svg'

type Props = {
  type: string
}

const Header: React.FC<Props> = ({ type }) => {
  return (
    <header className={styles.header}>
      {type === 'home' ? (
        <h1 className={`${styles.logo} ${styles.wave}`}>
          <Link href="/" prefetch={false}>
            <a>
              <Image src={imgSrc} alt="Breathnote" />
            </a>
          </Link>
        </h1>
      ) : (
        <div className={`${styles.logo} ${styles.wave}`}>
          <Link href="/" prefetch={false}>
            <a>
              <Image src={imgSrc} alt="Breathnote" />
            </a>
          </Link>
        </div>
      )}
      <GlobalNavigation />
    </header>
  )
}

export default Header
