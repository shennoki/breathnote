import Date from 'components/date'
import Body from 'components/layout/body'
import { getConfig, getSortedPosts } from 'lib/cms'
import { ConfigType, PostType } from 'lib/types'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import React, { FC } from 'react'

type Props = {
  config: ConfigType
  allPosts: PostType[]
}

const Home: FC<Props> = ({ config, allPosts }) => {
  const pageType = 'top'

  return (
    <Body pageType={pageType} config={config}>
      <section>
        {allPosts.map(({ id, publishedAt, title, categories }) => (
          <article key={id}>
            <Link href={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <small>
              <Date publishedAt={publishedAt} />
            </small>
            {categories.map(({ id, name }) => (
              <div key={id}>{name}</div>
            ))}
          </article>
        ))}
      </section>
    </Body>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const config = await getConfig()
  const allPosts = await getSortedPosts()
  return {
    props: {
      config,
      allPosts,
    },
  }
}
