import { getFormattedDate } from 'libs/date'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Post } from 'types/post'
import styles from './BlogCard.module.scss'

type Props = {
  post: Post
}

const BlogCard: React.FC<Props> = ({ post }) => {
  return (
    <article className={styles.article}>
      <div className={styles.thumbnail}>
        <Image src="/img/tmb/note.png" alt={post.title} width={850} height={445} priority={true} />
        {/* <Image src={post.thumbnail.url} alt={post.title} width={850} height={445} priority={true} /> */}
      </div>
      <time dateTime={post.publishedAt} itemProp="datepublished" className={styles.date}>
        {getFormattedDate(post.publishedAt, 'yyyy年M月d日')}
      </time>
      <h2 className={styles.title}>
        <Link href={`/posts/${post.slug}`} prefetch={false}>
          <a>{post.title}</a>
        </Link>
      </h2>
      <hr />
      <ul className={styles.keywords}>
        {post.keywords.map((keyword) => (
          <li key={keyword.id}>{keyword.name}</li>
        ))}
      </ul>
      <div className={styles.loader}>
        <div className={styles.inner1}></div>
        <div className={styles.inner2}></div>
        <div className={styles.inner3}></div>
      </div>
    </article>
  )
}

export default BlogCard
