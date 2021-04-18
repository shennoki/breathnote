import Image from 'next/image'
import React from 'react'
import styles from './About.module.scss'

const About: React.FC = () => {
  return (
    <article className={styles.article}>
      <h1 className={styles.title}>Welcome to BreathNote</h1>
      <div className={styles.profile}>
        <Image src="/img/profile.png" width={1000} height={1000} alt="Shinki" priority={true} />
        <span>
          <a href="https://twitter.com/code_shinki" target="_blank" rel="nofollow noopener noreferrer">
            Shinki
          </a>
        </span>
      </div>
      <div className={styles.body}>
        <p>BreathNoteはフロントエンド技術を中心に備忘録をアウトプットするために運営しているブログです。</p>
        <p>
          当サイトに掲載されているコンテンツは自由にご利用いただけますが、ご利用の際に生じた如何なる不具合も当サイトは一切責任を負いません。自己責任でご利用ください。なお、上部のプロフィールアイコンなど当サイトのみで利用されているオリジナル素材のダウンロード等は固く禁じています。ご了承ください。
        </p>
        <p>管理者への問い合わせやエントリーの訂正・削除希望などは、Twitter等からご連絡ください。</p>
        <h2>Google Analyticsについて</h2>
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
