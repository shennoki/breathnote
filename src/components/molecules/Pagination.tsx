import Link from 'next/link'
import React from 'react'
import { ARTICLE_PER_PAGE } from 'utils/env'
import styles from './Pagination.module.scss'

type Props = {
  type: string
  postLength: number
  offset: number
  slug?: string
}

const Pagination: React.FC<Props> = ({ type, postLength, offset, slug }) => {
  const quantity = Math.ceil(postLength / ARTICLE_PER_PAGE)
  const path = type === 'keywords' ? `/keywords/${slug}/` : `/`

  // 記事数に応じたページネーション配列を返却 : range(1, 5) => [ 1, 2, 3, 4, 5 ]
  const range = (start: number, end: number) => {
    return [...Array(end - start + 1)].map((_, i) => start + i)
  }

  return (
    <nav aria-label="pagination" className={styles.nav}>
      <ul className={styles.ul}>
        {range(1, quantity).map((num) => (
          <React.Fragment key={num.toString()}>
            {/* 後省略記号 : 最終ループで要素の前に付与する (現在地が最終ページより3ページ以上前の場合のみ表示) */}
            {num === quantity && offset <= quantity - 3 && (
              <li key="predotted" className={styles.dotted}>
                ...
              </li>
            )}

            {/* ページネーションボタン : ループが「現ページ or 1ページ目 or 最終ページ or 現在地に隣接する」場合に表示 */}
            {num === offset || num === 1 || num === quantity || num === offset - 1 || num === offset + 1 ? (
              <li key={-num.toString()} className={`${styles.li} ${num === offset && styles['li-current']}`}>
                <Link href={num === 1 ? `${path}` : `${path}page/${num}`}>
                  <a className={styles.link}>{num.toString()}</a>
                </Link>
              </li>
            ) : null}

            {/* 前省略記号 : ループの1回目で要素の前に付与する (現在地が初期ページより3ページ以上先の場合のみ表示) */}
            {num === 1 && offset >= 4 && (
              <li key="postdotted" className={styles.dotted}>
                ...
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination
