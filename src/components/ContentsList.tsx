import Svg from 'components/Svg'
import Link from 'next/link'
import React, { FC } from 'react'

const ContentsList: FC = () => {
  return (
    <>
      <aside className="mx-auto mt-10 sm:mt-16 lg:mt-20 table">
        <h2 className="mb-3 sm:mb-5 lg:mb-6 text-xl sm:text-2xl tracking-wider flex justify-center items-center">
          <span className="text-accent-light dark:text-accent-dark text-2xl sm:text-3xl">C</span>ONTENTS
        </h2>
        <ul className="flex">
          <li className="mx-5 lg:mx-8 text-sm sm:text-base">
            <Link href="/keywords">
              <a className="hover:text-accent-light dark:hover:text-accent-dark flex items-center">
                <Svg type="keyword" strokeWidth={1.5} class="w-6 h-6 mr-2" />
                キーワード一覧
              </a>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  )
}

export default ContentsList
