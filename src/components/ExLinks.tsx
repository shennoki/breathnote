import Svg from 'components/Svg'
import React, { FC } from 'react'

const ExLinks: FC = () => {
  return (
    <>
      <aside className="mt-10 md:mt-0 mx-auto table">
        <h2 className="mb-3 md:mb-5 lg:mb-6 text-lg md:text-2xl tracking-wider flex justify-center items-center">
          <span className="text-accent dark:text-yellow-300 text-2xl md:text-4xl transition-my-colors">B</span>ASE
        </h2>
        <ul className="flex justify-center">
          <li className="text-sm md:text-base">
            <a
              href="https://twitter.com/code_shinki"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="hover:text-accent dark:hover:text-yellow-300 flex items-center"
            >
              <Svg type="location" strokeWidth={1.5} class="w-6 h-6 mr-1" />
              Twitter
            </a>
          </li>
          <li className="mx-4 md:mx-6 lg:mx-9 text-sm md:text-base">
            <a
              href="https://github.com/Code-Shinki"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="hover:text-accent dark:hover:text-yellow-300 flex items-center"
            >
              <Svg type="location" strokeWidth={1.5} class="w-6 h-6 mr-1" />
              GitHub
            </a>
          </li>
          <li className="text-sm md:text-base">
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
