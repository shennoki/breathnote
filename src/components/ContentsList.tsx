import Svg from 'components/Svg'
import Link from 'next/link'
import React, { FC } from 'react'

const ContentsList: FC = () => {
  return (
    <>
      <aside className="mx-auto table">
        <h2 className="mb-3 md:mb-5 lg:mb-6 text-lg md:text-2xl tracking-wider flex justify-center items-center">
          <span className="text-blue-400 dark:text-yellow-400 text-2xl md:text-4xl">C</span>ONTENTS
        </h2>
        <ul className="flex">
          <li className="mx-5 lg:mx-8 text-sm md:text-base">
            <Link href="/categories">
              <a className="hover:text-blue-500 dark:hover:text-yellow-400 flex items-center transition-my-colors">
                <Svg type="category" strokeWidth={1.5} class="w-6 h-6 mr-2" />
                カテゴリ一覧
              </a>
            </Link>
          </li>
          <li className="mx-5 lg:mx-8 text-sm md:text-base">
            <Link href="/tags">
              <a className="hover:text-blue-500 dark:hover:text-yellow-400 flex items-center transition-my-colors">
                <Svg type="tag" strokeWidth={1.5} class="w-6 h-6 mr-2" />
                タグ一覧
              </a>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  )
}

export default ContentsList
