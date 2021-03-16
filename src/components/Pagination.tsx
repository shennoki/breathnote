import Link from 'next/link'
import React, { FC } from 'react'
import { ARTICLE_PER_PAGE } from 'utils/env'

type Props = {
  allPostLength: number
  pageType: string
  offset: number
  slug?: string
}

const Pagination: FC<Props> = ({ allPostLength, pageType, offset, slug }) => {
  let path: string, rootPath: string
  const quantity = Math.ceil(allPostLength / ARTICLE_PER_PAGE)

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
      <nav aria-label="pagination" className="my-6">
        <ul className="flex justify-center">
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
                  className={`mx-1 md:mx-2 border border-clearness dark:border-shadow-dark rounded-full ${
                    num === offset
                      ? `shadow-inset-light dark:shadow-inset-dark `
                      : `border-shadow-light hover:border-clearness`
                  } hover:shadow-inset-light dark:hover:shadow-inset-dark`}
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
      </nav>
    </>
  )
}

export default Pagination
