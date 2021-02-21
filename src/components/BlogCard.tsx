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
      <article className="p-3 md:p-4 lg:p-5 mb-5 md:mb-7 lg:mb-8 xl:mb-9 rounded-lg border-light dark:border-dark shadow-neumo hover:shadow-none dark:shadow-neumo-dark dark:hover:shadow-none relative">
        <h2 className="mb-2 sm:mb-3 text-base sm:text-lg lg:text-xl">{post.title}</h2>
        <ul className="mb-3 sm:mb-4 text-xs sm:text-sm flex">
          {post.categories.map((category) => (
            <li
              key={category.id}
              className={`px-2 md:px-3 py-0.5 mr-2 sm:mr-3 md:mr-4 text-accent dark:text-yellow-300 rounded-sm md:rounded border-light dark:border-dark shadow-inset dark:shadow-inset-dark`}
            >
              {category.title}
            </li>
          ))}
        </ul>
        <p className="mb-3 text-xs leading-normal md:hidden">{`${post.description.substr(0, 75)} ...`}</p>
        <p className="mb-3 text-sm leading-normal hidden md:block">{`${post.description.substr(0, 140)} ...`}</p>
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
