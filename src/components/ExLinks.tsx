import Svg from 'components/Svg'
import React, { FC } from 'react'

const ExLinks: FC = () => {
  return (
    <>
      <aside className="mx-auto mt-10 sm:mt-16 lg:mt-20 table">
        <h2 className="mb-3 sm:mb-5 lg:mb-6 text-xl sm:text-2xl tracking-wider flex justify-center items-center">
          <span className="text-accent-light dark:text-accent-dark text-2xl sm:text-3xl">M</span>ORE
        </h2>
        <ul className="flex justify-center">
          <li className="text-sm sm:text-base">
            <a
              href="https://twitter.com/code_shinki"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="hover:text-accent-light dark:hover:text-accent-dark flex items-center"
            >
              <Svg type="location" strokeWidth={1.5} class="w-6 h-6 mr-1" />
              Twitter
            </a>
          </li>
          <li className="mx-4 sm:mx-6 lg:mx-9 text-sm sm:text-base">
            <a
              href="https://github.com/Code-Shinki"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="hover:text-accent-light dark:hover:text-accent-dark flex items-center"
            >
              <Svg type="location" strokeWidth={1.5} class="w-6 h-6 mr-1" />
              GitHub
            </a>
          </li>
          <li className="text-sm sm:text-base">
            <div className="line-through flex items-center">
              <Svg type="location" strokeWidth={1.5} class="w-6 h-6 mr-1" />
              Shinki.net
            </div>
          </li>
        </ul>
      </aside>
    </>
  )
}

export default ExLinks
