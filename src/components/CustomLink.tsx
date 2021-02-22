import Link from 'next/link'
import React, { FC } from 'react'

type Props = {
  href: string
}

const CustomLink: FC<Props> = ({ href, ...otherProps }) => {
  const hrefCheck = href.substr(0, 1)

  return (
    <>
      {hrefCheck === '/' ? (
        <Link href={href}>
          {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
          <a {...otherProps} />
        </Link>
      ) : (
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        <a href={href} target="_blank" rel="noopener noreferrer" {...otherProps} />
      )}
    </>
  )
}

export default CustomLink
