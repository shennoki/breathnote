import Svg from 'components/Svg'
import Link from 'next/link'
import React, { FC } from 'react'
import { getCorrectDate } from 'scripts/date'
import { PostType } from 'types'

type Props = {
  post: PostType
}

const BlogCard: FC<Props> = ({ post }) => {
  return (
    <>
      <article className="p-3 md:p-4 lg:p-5 mb-6 md:mb-7 lg:mb-8 xl:mb-9 border border-shadow-light dark:border-shadow-dark rounded-lg shadow-light hover:shadow-none dark:shadow-dark dark:hover:shadow-none relative">
        <h2 className="mb-3 text-base sm:text-lg lg:text-xl">{post.title}</h2>
        <ul className="mb-4 text-xs sm:text-sm flex flex-wrap">
          {post.keywords.map((keyword) => (
            <li
              key={keyword.id}
              className={`px-2 md:px-3 py-1 mr-2 sm:mr-3 md:mr-4 text-accent-light dark:text-accent-dark rounded border border-shadow-light dark:border-shadow-dark shadow-inset-light dark:shadow-inset-dark`}
            >
              {keyword.name}
            </li>
          ))}
        </ul>
        <p className="mb-4 text-xs sm:text-sm leading-normal md:hidden">{`${post.description.substr(0, 75)} ...`}</p>
        <p className="mb-4 text-sm leading-normal hidden md:block">{post.description}</p>
        <div className="flex justify-end items-center">
          <Svg type="publish" strokeWidth={1.5} class="w-4 md:w-5 h-4 md:h-5 mr-2" />
          <time dateTime={post.publishedAt} itemProp="datepublished" className="text-xs md:text-sm text-right block">
            {getCorrectDate(post.publishedAt, 'yyyy年MM月dd日')}
          </time>
        </div>
        <Link href={`/posts/${post.slug}`}>
          <a className="w-full h-full opacity-0 absolute top-0 left-0">Link</a>
        </Link>
      </article>
    </>
  )
}

export default BlogCard
