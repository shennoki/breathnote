import React from 'react'
import styles from './Error.module.scss'

const ErrorArticle: React.FC = () => {
  return (
    <article className={styles.article}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>Not Found ...</h2>
      <p className={styles.message}>申し訳ございません。ご指定いただいたページが見つかりませんでした。</p>
      <p className={styles.message}>ホームへ戻るか、各種SNSから管理者へご連絡ください。</p>
    </article>
  )
}

export default ErrorArticle
