import React from 'react'
import styles from './PostBody.module.scss'

type Props = {
  body: React.ReactNode
}

const PostBody: React.FC<Props> = ({ body }) => {
  return <div className={`${styles.post} prism-root`}>{body}</div>
}

export default PostBody
