import React from 'react'
import styles from './WaveSvg.module.scss'

const WaveSvg: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
      shapeRendering="auto"
      className={styles.waves}
    >
      <defs>
        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
      </defs>
      <g className={styles.parallax}>
        <use xlinkHref="#gentle-wave" x="48" y="7" fill="currentColor" />
      </g>
    </svg>
  )
}

export default WaveSvg
