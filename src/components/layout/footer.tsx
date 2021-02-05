import React, { FC } from 'react'

const Footer: FC = () => {
  return (
    <footer>
      <small>&copy; 2019 - {new Date().getFullYear()} Shinki all rights reserved.</small>
    </footer>
  )
}

export default Footer
