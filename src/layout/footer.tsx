import React, { FC } from 'react'

const Footer: FC = () => {
  const nowYear = new Date().getFullYear()

  return (
    <footer>
      <small>&copy; 2020 - {nowYear} Shinki all rights reserved.</small>
    </footer>
  )
}

export default Footer
