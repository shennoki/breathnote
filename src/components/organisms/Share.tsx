import SvgIcon from 'components/atoms/SvgIcon'
import React, { useState } from 'react'
import styles from './Share.module.scss'

type Props = {
  url: string
  title: string
}

const Share: React.FC<Props> = ({ url, title }) => {
  const [copyIcon, setCopyIcon] = useState<'clipboard' | 'success'>('clipboard')
  const [isCopied, setIsCopied] = useState(false)
  const encodedPath = encodeURIComponent(url)

  const copy = () => {
    navigator.clipboard.writeText(`${title} ${url}`).then(() => {
      setIsCopied(true)
      setCopyIcon('success')
    })
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Share</h2>
      <ul className={styles.list}>
        <li>
          <a
            href={`https://twitter.com/share?url=${encodedPath}`}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className={`${styles.link} ${styles.twitter}`}
          >
            <SvgIcon type="twitter" size="2em" strokeWidth={2.5} />
            <span>Share on Twitter</span>
          </a>
        </li>
        <li>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedPath}`}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className={`${styles.link} ${styles.facebook}`}
          >
            <SvgIcon type="facebook" size="1.95em" strokeWidth={1} />
            <span>Share on Facebook</span>
          </a>
        </li>
        <li>
          <button
            type="button"
            onClick={copy}
            className={`${styles.link} ${styles.clipboard} ${isCopied && styles.isCopied}`}
          >
            <SvgIcon type={copyIcon} size="2em" strokeWidth={2.5} />
            <span>Copy URL & Title</span>
          </button>
        </li>
      </ul>
    </section>
  )
}

export default Share
