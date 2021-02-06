import Body from 'components/layout/body'
import { getAllCategories, getConfig } from 'lib/getter'
import { CategoryType, ConfigType } from 'lib/types'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import React, { FC } from 'react'

type Props = {
  config: ConfigType
  allCategories: CategoryType[]
}

const Categories: FC<Props> = ({ config, allCategories }) => {
  const pageType = 'categories'

  return (
    <Body config={config} pageType={pageType}>
      <h1>Categories</h1>
      <ul>
        {allCategories.map(({ id, slug, title }) => (
          <li key={id}>
            <Link href={`/categories/${slug}`}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Body>
  )
}

export default Categories

export const getStaticProps: GetStaticProps = async () => {
  const config = await getConfig()
  const allCategories = await getAllCategories()
  return {
    props: {
      config,
      allCategories,
    },
  }
}
