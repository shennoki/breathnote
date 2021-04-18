import SvgIcon from 'components/atoms/SvgIcon'
import React, { useEffect, useState } from 'react'
import styles from './ThemeToggler.module.scss'

const ThemeToggler: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const html = document.querySelector('html') as HTMLHtmlElement

    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      html.classList.remove('light')
      html.classList.add('dark')
      setDarkMode(true)
    } else {
      html.classList.remove('dark')
      html.classList.add('light')
      setDarkMode(false)
    }
  }, [darkMode])

  const handleChangeDarkMode = () => {
    if (darkMode) {
      localStorage.theme = 'light'
      setDarkMode(false)
    } else {
      localStorage.theme = 'dark'
      setDarkMode(true)
    }
  }

  return (
    <div className={styles.root}>
      <SvgIcon type="sun" size="1.4em" strokeWidth={1.5} />
      <div className={styles.toggler}>
        <input id="toggle" type="checkbox" name="toggle" checked={darkMode} onChange={handleChangeDarkMode} />
        <label htmlFor="toggle">toggle</label>
      </div>
      <SvgIcon type="moon" size="1.4em" strokeWidth={1.5} />
    </div>
  )
}

export default ThemeToggler
