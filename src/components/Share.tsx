import React, { FC } from 'react'

type Props = {
  path: string
}

const Share: FC<Props> = (props) => {
  const encodedPath = encodeURIComponent(props.path)

  return (
    <aside className="mt-8 md:mt-10 lg:mt-12">
      <h2 className="mb-3 md:mb-5 lg:mb-6 text-lg md:text-2xl tracking-wider flex justify-center items-center">
        <span className="text-accent dark:text-yellow-300 text-2xl md:text-4xl">S</span>HARE
      </h2>
      <div className="flex justify-center items-center">
        <a
          href={`https://twitter.com/share?url=${encodedPath}`}
          title="Twitterでシェアする"
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="w-11 md:w-14 h-11 md:h-14 mx-2 md:mx-4 rounded-full flex justify-center items-center text-twitter border-light dark:border-dark hover:border-twitter shadow-neumo hover:shadow-none dark:shadow-inset-dark dark:hover:shadow-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
            className="w-6 md:w-8 h-6 md:h-8"
          >
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
          </svg>
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedPath}`}
          title="Facebookでシェアする"
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="w-11 md:w-14 h-11 md:h-14 mx-2 md:mx-4 rounded-full flex justify-center items-center text-facebook border-light dark:border-dark hover:border-facebook shadow-neumo hover:shadow-none dark:shadow-inset-dark dark:hover:shadow-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
            className="w-6 md:w-8 h-6 md:h-8"
          >
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
          </svg>
        </a>
        <a
          href={`https://social-plugins.line.me/lineit/share?url=${encodedPath}`}
          title="LINEでシェアする"
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="w-11 md:w-14 h-11 md:h-14 mx-2 md:mx-4 rounded-full flex justify-center items-center text-line border-light dark:border-dark hover:border-line shadow-neumo hover:shadow-none dark:shadow-inset-dark dark:hover:shadow-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="-0.5 -1 25 25"
            fill="currentColor"
            stroke="none"
            className="w-7 md:w-9 h-7 md:h-9"
          >
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
          </svg>
        </a>
        <a
          href={`http://b.hatena.ne.jp/add?&url=${encodedPath}`}
          title="はてなブックマークでシェアする"
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="w-11 md:w-14 h-11 md:h-14 mx-2 md:mx-4 rounded-full flex justify-center items-center text-hatena border-light dark:border-dark hover:border-hatena shadow-neumo hover:shadow-none dark:shadow-inset-dark dark:hover:shadow-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
            className="w-5 md:w-7 h-5 md:h-7"
          >
            <path d="M20.47 0C22.42 0 24 1.58 24 3.53v16.94c0 1.95-1.58 3.53-3.53 3.53H3.53C1.58 24 0 22.42 0 20.47V3.53C0 1.58 1.58 0 3.53 0h16.94zm-3.705 14.47c-.78 0-1.41.63-1.41 1.41s.63 1.414 1.41 1.414 1.41-.645 1.41-1.425-.63-1.41-1.41-1.41zM8.61 17.247c1.2 0 2.056-.042 2.58-.12.526-.084.976-.222 1.32-.412.45-.232.78-.564 1.02-.99s.36-.915.36-1.48c0-.78-.21-1.403-.63-1.87-.42-.48-.99-.734-1.74-.794.66-.18 1.156-.45 1.456-.81.315-.344.465-.824.465-1.424 0-.48-.103-.885-.3-1.26-.21-.36-.493-.645-.883-.87-.345-.195-.735-.315-1.215-.405-.464-.074-1.29-.12-2.474-.12H5.654v10.486H8.61zm.736-4.185c.705 0 1.185.088 1.44.262.27.18.39.495.39.93 0 .405-.135.69-.42.855-.27.18-.765.254-1.44.254H8.31v-2.297h1.05zm8.656.706v-7.06h-2.46v7.06H18zM8.925 9.08c.71 0 1.185.08 1.432.24.245.16.367.435.367.83 0 .38-.13.646-.39.804-.265.154-.747.232-1.452.232h-.57V9.08h.615z" />
          </svg>
        </a>
        <a
          href={`https://getpocket.com/edit?url=${encodedPath}`}
          title="Pocketでシェアする"
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="w-11 md:w-14 h-11 md:h-14 mx-2 md:mx-4 rounded-full flex justify-center items-center text-pocket border-light dark:border-dark hover:border-pocket shadow-neumo hover:shadow-none dark:shadow-inset-dark dark:hover:shadow-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 -1 24 24"
            fill="currentColor"
            stroke="none"
            className="w-6 md:w-8 h-6 md:h-8"
          >
            <path d="M18.813 10.259l-5.646 5.419c-.32.305-.73.458-1.141.458-.41 0-.821-.153-1.141-.458l-5.646-5.419c-.657-.628-.677-1.671-.049-2.326.63-.657 1.671-.679 2.325-.05l4.511 4.322 4.517-4.322c.66-.631 1.697-.607 2.326.049.631.645.615 1.695-.045 2.326l-.011.001zm5.083-7.546c-.299-.858-1.125-1.436-2.041-1.436H2.179c-.9 0-1.717.564-2.037 1.405-.094.25-.142.511-.142.774v7.245l.084 1.441c.348 3.277 2.047 6.142 4.682 8.139.045.036.094.07.143.105l.03.023c1.411 1.03 2.989 1.728 4.694 2.072.786.158 1.591.24 2.389.24.739 0 1.481-.067 2.209-.204.088-.029.176-.045.264-.06.023 0 .049-.015.074-.029 1.633-.36 3.148-1.036 4.508-2.025l.029-.031.135-.105c2.627-1.995 4.324-4.862 4.686-8.148L24 10.678V3.445c0-.251-.031-.5-.121-.742l.017.01z" />
          </svg>
        </a>
      </div>
    </aside>
  )
}

export default Share
