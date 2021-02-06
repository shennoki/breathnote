import Date from 'components/date'
import Body from 'components/layout/body'
import { getConfig, getSortedPosts } from 'lib/getter'
import { ConfigType, PostType } from 'lib/types'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import React, { FC } from 'react'

type Props = {
  config: ConfigType
  allPosts: PostType[]
}

const Home: FC<Props> = ({ config, allPosts }) => {
  const pageType = 'home'

  return (
    <Body config={config} pageType={pageType}>
      <section>
        {allPosts.map(({ id, publishedAt, slug, title, categories }) => (
          <article key={id}>
            <Link href={`/posts/${slug}`}>
              <h2>
                <a>{title}</a>
              </h2>
            </Link>
            <Date publishedAt={publishedAt} />
            {categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <a>{category.title}</a>
              </Link>
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
