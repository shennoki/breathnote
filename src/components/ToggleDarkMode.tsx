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
      <div className="text-xs">
        <Svg type="sun" strokeWidth={2} class="w-6 h-6" />
      </div>
      <div className="relative inline-block w-12 mx-2 align-middle select-none">
        <input
          type="checkbox"
          name="toggle"
          id="toggle"
          checked={darkMode}
          className="toggle-checkbox"
          onChange={handleChangeDarkMode}
        />
        <label htmlFor="toggle" className="toggle-label">
          toggle
        </label>
      </div>
      <div className="text-xs">
        <Svg type="moon" strokeWidth={2} class="w-6 h-6" />
      </div>
    </div>
  )
}

export default ToggleDarkMode
