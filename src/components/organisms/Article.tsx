import SvgIcon from 'components/atoms/SvgIcon'
import PostBody from 'components/molecules/PostBody'
import { getFormattedDate } from 'libs/date'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Post } from 'types/post'
import styles from './Article.module.scss'

type Props = {
  post: Post
  body: React.ReactNode
}

const Article: React.FC<Props> = ({ post, body }) => {
  return (
    <article className={styles.article}>
      {post.thumbnail && (
        <div className={styles.thumbnail}>
          <Image
            src={post.thumbnail.url}
            alt={post.title}
            width={post.thumbnail.width}
            height={post.thumbnail.height}
            priority={true}
          />
        </div>
      )}
      <div className={styles.date}>
        <div className={styles.published}>
          <SvgIcon type="published" strokeWidth={2.5} size="1.6em" />
          <time dateTime={post.publishedAt} itemProp="datePublished">
            {getFormattedDate(post.publishedAt, 'yyyy / MM / dd')}
          </time>
        </div>
        <div className={styles.modified}>
          <SvgIcon type="modified" strokeWidth={2} size="1.55em" />
          <time dateTime={post.revisedAt} itemProp="dateModified">
            {getFormattedDate(post.revisedAt, 'yyyy / MM / dd')}
          </time>
        </div>
      </div>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.body}>
        <PostBody body={body} />
      </div>
      <ul className={styles.keywords}>
        {post.keywords.map((keyword) => (
          <li key={keyword.id}>
            <Link href={`/keywords/${keyword.slug}`}>
              <a>{keyword.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default Article
