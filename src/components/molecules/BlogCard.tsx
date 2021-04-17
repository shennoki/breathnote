import { getFormattedDate } from 'libs/date'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Post } from 'types/post'
import { SITE_DOMAIN } from 'utils/env'
import styles from './BlogCard.module.scss'

type Props = {
  post: Post
}

const BlogCard: React.FC<Props> = ({ post }) => {
  return (
    <article className={styles.article}>
      <div className={styles.thumbnail}>
        <Image
          width={post.thumbnail ? post.thumbnail.width : 850}
          height={post.thumbnail ? post.thumbnail.height : 445}
          src={post.thumbnail ? post.thumbnail.url : `${SITE_DOMAIN}/img/og-img.jpg`}
          alt={post.title}
        />
      </div>
      <time dateTime={post.publishedAt} itemProp="datepublished" className={styles.date}>
        {getFormattedDate(post.publishedAt, 'yyyy / MM / dd')}
      </time>
      <h2 className={styles.title}>
        <Link href={`/posts/${post.slug}`}>
          <a>{post.title}</a>
        </Link>
      </h2>
      <ul className={styles.keywords}>
        {post.keywords.map((keyword) => (
          <li key={keyword.id}>{keyword.name}</li>
        ))}
      </ul>
    </article>
  )
}

export default BlogCard
