import Link from 'next/link'
import React, { FC } from 'react'
import { PER_PAGE } from 'scripts/const'

type Props = {
  allPostCount: number
  pageType: string
  offset: number
  slug?: string
}

const Pagination: FC<Props> = ({ allPostCount, pageType, offset, slug }) => {
  let path: string, rootPath: string
  const quantity = Math.ceil(allPostCount / PER_PAGE)

  switch (pageType) {
    case 'keyword':
      rootPath = `/keywords/${slug}`
      path = `/keywords/${slug}/page`
      break
    default:
      rootPath = `/`
      path = `/page`
      break
  }

  const range = (start: number, end: number) => {
    return [...Array(end - start + 1)].map((_, i) => start + i)
  }

  return (
    <>
      <ul className="my-6 flex justify-center">
        {range(1, quantity).map((num, index) => (
          <React.Fragment key={index}>
            {num === quantity && offset <= quantity - 3 ? (
              <li key="predotted" className="py-1 md:py-2 leading-none">
                ...
              </li>
            ) : null}

            {num === 1 || num === quantity || (num > offset - 2 && num < offset + 2) ? (
              <li
                key={num}
                className={`mx-1 md:mx-2 rounded-full border-light dark:border-dark ${
                  num === offset ? `shadow-inset dark:shadow-inset-dark` : null
                } hover:border-light dark:hover:border-dark hover:shadow-inset dark:hover:shadow-inset-dark`}
              >
                <Link href={num === 1 ? rootPath : `${path}/${num}`}>
                  <a className="px-3 md:px-4 py-1 md:py-2 rounded-full block">{num}</a>
                </Link>
              </li>
            ) : null}

            {num === 1 && offset >= 4 ? (
              <li key="postdotted" className="py-1 md:py-2 leading-none">
                ...
              </li>
            ) : null}
          </React.Fragment>
        ))}
      </ul>
    </>
  )
}

export default Pagination
