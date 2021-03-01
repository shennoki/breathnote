import Svg from 'components/Svg'
import React, { FC, useEffect, useState } from 'react'

const ToggleDarkMode: FC = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setDarkMode(true)
      document.querySelector('html')?.classList.add('dark')
    } else {
      setDarkMode(false)
      document.querySelector('html')?.classList.remove('dark')
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
    <div className="flex">
      <Svg type="sun" strokeWidth={2} class="w-6 h-6" />
      <div className="relative inline-block w-12 mx-2 align-middle select-none">
        <input
          type="checkbox"
          name="toggle"
          id="toggle"
          checked={darkMode}
          className="toggle-checkbox"
          onChange={handleChangeDarkMode}
        />
        <label
          htmlFor="toggle"
          className="h-6 text-snow-200 dark:text-night-400 bg-snow-200 dark:bg-night-300 rounded-full overflow-hidden block cursor-pointer"
        >
          .
        </label>
      </div>
      <Svg type="moon" strokeWidth={2} class="w-6 h-6" />
    </div>
  )
}

export default ToggleDarkMode
