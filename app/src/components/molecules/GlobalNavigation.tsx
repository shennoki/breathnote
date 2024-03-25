import SvgIcon from 'components/atoms/SvgIcon'
import ThemeToggler from 'components/molecules/ThemeToggler'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from './GlobalNavigation.module.scss'

const GlobalNavigation: React.FC = () => {
  const [linkState, setLinkState] = useState<boolean>(true)

  useEffect(() => {
    setLinkState(true)
  }, [])

  const handleChangeLinkState = () => {
    setLinkState(false)
  }

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link href="/about" prefetch={false}>
            <a>
              <SvgIcon type="navigation" size="1.3em" strokeWidth={1.5} />
              <span className="kerning">About</span>
            </a>
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/atom.xml" prefetch={false}>
            {linkState ? (
              <a onClick={handleChangeLinkState}>
                <SvgIcon type="rss" size="1.3em" strokeWidth={1.5} />
                <span className="kerning">RSS</span>
              </a>
            ) : (
              <a className="link-disable">
                <SvgIcon type="modified" size="1.5em" strokeWidth={3} classes={styles.spin} />
                <span className="kerning">Generating</span>
              </a>
            )}
          </Link>
        </li>
        <li className={styles.item}>
          <ThemeToggler />
        </li>
      </ul>
    </nav>
  )
}

export default GlobalNavigation
