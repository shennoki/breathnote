import Link from 'next/link'
import React from 'react'
import { Keyword } from 'types/keyword'
import styles from './Keywords.module.scss'

type Props = {
  keywords: Keyword[]
}

const Keywords: React.FC<Props> = ({ keywords }) => {
  const items = keywords.map((keyword) => (
    <li key={keyword.slug}>
      <Link href={`/keywords/${keyword.slug}`} prefetch={false}>
        <a>
          <span>{keyword.name}</span>
        </a>
      </Link>
    </li>
  ))

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Keywords</h2>
      <ul className={styles.list}>{items}</ul>
    </section>
  )
}

export default Keywords
