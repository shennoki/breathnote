import SvgIcon from 'components/atoms/SvgIcon'
import ThemeToggler from 'components/molecules/ThemeToggler'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import styles from './GlobalNavigation.module.scss'

const GlobalNavigation: React.FC = () => {
  const router = useRouter()
  const previousUrlRef = useRef(router.asPath)
  const [linkState, setLinkState] = useState<boolean>(true)

  const handleChangeLinkState = () => {
    setLinkState(false)
  }

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url !== previousUrlRef.current) {
        // URLが実際に変更された場合のみ処理を行う
        setLinkState(true)
        // 現在のURLを保存
        previousUrlRef.current = url
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    // コンポーネントのアンマウント時にイベントリスナーを削除する
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])

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
