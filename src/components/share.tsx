import React, { FC } from 'react'

type Props = {
  path: string
  text: string
}

const Share: FC<Props> = ({ path, text }) => {
  const encodedPath = encodeURIComponent(path)
  const encodedText = encodeURIComponent(text)

  return (
    <section>
      <a
        href={`https://twitter.com/share?url=${encodedPath}&text=${encodedText}`}
        title="Twitterでシェアする"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        Twitter
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedPath}`}
        title="Facebookでシェアする"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        Facebook
      </a>
      <a
        href={`https://social-plugins.line.me/lineit/share?url=${encodedPath}`}
        title="LINEでシェアする"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        LINE
      </a>
      <a
        href={`http://b.hatena.ne.jp/add?&url=${encodedPath}`}
        title="はてなブックマークでシェアする"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        はてなブックマーク
      </a>
      <a
        href={`https://getpocket.com/edit?url=${encodedPath}`}
        title="Pocketでシェアする"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        Pocket
      </a>
      <a
        href={`https://feedly.com/i/subscription/feed/${encodedPath}`}
        title="Feedlyでシェアする"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        Feedly
      </a>
    </section>
  )
}

export default Share
