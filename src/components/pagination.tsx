import Link from 'next/link'
import React, { FC } from 'react'
import { PER_PAGE } from 'scripts/const'

type Props = {
  allPostCount: number
  pageType: string
  slug?: string
}

const Pagination: FC<Props> = (props) => {
  let path: string, rootPath: string

  if (props.pageType === 'category') {
    rootPath = `/categories/${props.slug}`
    path = `/categories/${props.slug}/page`
  } else if (props.pageType === 'tag') {
    rootPath = `/tags/${props.slug}`
    path = `/tags/${props.slug}/page`
  } else {
    rootPath = `/`
    path = `/page`
  }

  const range = (start: number, end: number) => {
    return [...Array(end - start + 1)].map((_, i) => start + i)
  }

  return (
    <>
      <ul>
        {range(1, Math.ceil(props.allPostCount / PER_PAGE)).map((number, index) => (
          <li key={index}>
            <Link href={number === 1 ? rootPath : `${path}/${number}`}>
              <a>{number}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Pagination
