import React from 'react'
import { Keyword } from 'types/keyword'
import styles from './KeywordHeader.module.scss'

type Props = {
  keyword: Keyword
  postLength: number
}

const KeywordHeader: React.FC<Props> = ({ keyword, postLength }) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{keyword.name}</h1>
      <p className={styles.counter}>{`- ${postLength} Articles -`}</p>
      <p className={styles.description}>{keyword.description}</p>
    </div>
  )
}

export default KeywordHeader
