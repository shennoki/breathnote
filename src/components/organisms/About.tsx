import React from 'react'
import styles from './About.module.scss'

const About: React.FC = () => {
  return (
    <article className={styles.article}>
      <h1 className={styles.title}>About this website</h1>
      <div className={styles.body}></div>
    </article>
  )
}

export default About
