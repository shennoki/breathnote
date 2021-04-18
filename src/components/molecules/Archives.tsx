import React from 'react'
import styles from './Archives.module.scss'

type Props = {
  children: React.ReactChild
}

const Archives: React.FC<Props> = ({ children }) => {
  return <section className={styles.root}>{children}</section>
}

export default Archives
