import React from 'react'
import styles from './Error.module.scss'

type Props = {
  status: number
  message: string
}

const ErrorArticle: React.FC<Props> = ({ status, message }) => {
  return (
    <article className={styles.article}>
      <h1 className={styles.title}>{status}</h1>
      <h2 className={styles.subtitle}>{message}</h2>
      <p className={styles.message}>申し訳ございません。サイト上でエラーが発生しました。</p>
      <p className={styles.message}>ホームへ戻るか、各種SNSから管理者へご連絡ください。</p>
    </article>
  )
}

export default ErrorArticle
