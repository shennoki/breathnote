import React, { FC } from 'react'

const Footer: FC = () => {
  const thisYear = new Date().getFullYear()

  return (
    <footer className="pb-5 md:pb-8 lg:pb-10 mt-12 md:mt-20 lg:mt-20 flex justify-center">
      <small className="text-xs lg:text-sm">{`(c) 2020 - ${thisYear} Shinki all rights reserved.`}</small>
    </footer>
  )
}

export default Footer
