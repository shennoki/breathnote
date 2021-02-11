import React, { FC } from 'react'

const Footer: FC = () => {
  const thisYear = new Date().getFullYear()

  return (
    <footer>
      <small>&copy; 2020 - {thisYear} Shinki all rights reserved.</small>
    </footer>
  )
}

export default Footer
