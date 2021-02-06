import Body from 'components/layout/body'
import { getAllTags, getConfig } from 'lib/getter'
import { ConfigType, TagType } from 'lib/types'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import React, { FC } from 'react'

type Props = {
  config: ConfigType
  allTags: TagType[]
}

const Tags: FC<Props> = ({ config, allTags }) => {
  const pageType = 'tags'

  return (
    <Body config={config} pageType={pageType}>
      <h1>Tags</h1>
      <ul>
        {allTags.map(({ id, slug, title }) => (
          <li key={id}>
            <Link href={`/tags/${slug}`}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Body>
  )
}

export default Tags

export const getStaticProps: GetStaticProps = async () => {
  const config = await getConfig()
  const allTags = await getAllTags()
  return {
    props: {
      config,
      allTags,
    },
  }
}
