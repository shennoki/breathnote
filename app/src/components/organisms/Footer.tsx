import SvgIcon from 'components/atoms/SvgIcon'
import WaveSvg from 'components/atoms/WaveSvg'
import React from 'react'
import styles from './Footer.module.scss'

const Footer: React.FC = () => {
  const thisYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <ul className={styles.exlink}>
        <li>
          <a href="https://shinki.net/" target="_blank" rel="noopener noreferrer" title="Portal">
            <SvgIcon type="home" size="2.3em" strokeWidth={2.3} />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/_shinnoki" target="_blank" rel="nofollow noopener noreferrer" title="Twitter">
            <SvgIcon type="twitter" size="2.3em" strokeWidth={2.3} />
          </a>
        </li>
        <li>
          <a href="https://github.com/shennoki" target="_blank" rel="nofollow noopener noreferrer" title="GitHub">
            <SvgIcon type="github" size="2em" strokeWidth={1} />
          </a>
        </li>
      </ul>
      <small className={styles.small}>{`2020 - ${thisYear} Shinki all rights reserved.`}</small>
      <WaveSvg />
    </footer>
  )
}

export default Footer
