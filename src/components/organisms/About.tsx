import React from 'react'
import styles from './About.module.scss'

const About: React.FC = () => {
  return (
    <article className={styles.article}>
      <div className={styles.visual}>
        <h1 className={styles.title}>For developers.</h1>
        <span className={styles.circle1}></span>
        <span className={styles.circle2}></span>
        <span className={styles.circle3}></span>
      </div>
      <div className={styles.body}>
        <p>Breath Noteへようこそ。</p>
        <p>
          このブログではフロントエンドからバックエンドまでフルスタックなWeb技術の話題や備忘録をアウトプットしています。
        </p>
        <p>ドキュメントの確認やバグフィックスのお供にどうぞ。</p>
        <h2>留意事項</h2>
        <p>
          当サイトに掲載されているコンテンツは原則自由にご利用いただけますが、ご利用の際に生じた如何なる不具合も当サイトは一切責任を負いません。自己責任でご利用ください。なお、当サイトオリジナル素材のダウンロード等は固く禁じています。ご了承ください。
        </p>
        <p>管理者へのお問い合わせやエントリーの訂正・削除希望は、Twitter等からご連絡ください。</p>
        <h2>アクセス情報の収集について</h2>
        <p>
          当サイトではGoogle Analyticsを用いて訪問者の情報収集を行っております。Google Analyticsを無効化したい場合は
          <a href="https://tools.google.com/dlpage/gaoptout?hl=ja" target="_blank" rel="nofollow noopener noreferrer">
            Google アナリティクス オプトアウト アドオン
          </a>
          をご利用ください。
        </p>
      </div>
    </article>
  )
}

export default About
