import React, { useEffect } from 'react'
import styles from './PostBody.module.scss'

type Props = {
  body: React.ReactNode
}

const PostBody: React.FC<Props> = ({ body }) => {
  useEffect(() => {
    // コードブロックのファイル名要素を移動
    const root = document.getElementsByClassName('prism-root')[0]
    const pre = root.getElementsByTagName('PRE')

    Array.from(pre).forEach((elm) => {
      const filenameElm = elm.previousElementSibling
      if (filenameElm && filenameElm.classList.contains('codeblock-filename')) {
        elm.appendChild(filenameElm)
      }
    })
  }, [])

  return <div className={`${styles.post} prism-root`}>{body}</div>
}

export default PostBody
