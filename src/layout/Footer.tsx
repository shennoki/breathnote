import React, { FC } from 'react'

const Footer: FC = () => {
  return (
    <footer className="pb-5 md:pb-8 lg:pb-10 mt-14 sm:mt-20 lg:mt-20 flex justify-center">
      <small className="text-xs lg:text-sm italic">{`(c) 2020 - ${new Date().getFullYear()} Shinki all rights reserved.`}</small>
    </footer>
  )
}

export default Footer
