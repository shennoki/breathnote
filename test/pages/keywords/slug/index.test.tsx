import { cleanup, render } from '@testing-library/react'
import React from 'react'
import { getKeywordPosts } from '../../../../src/libs/requests'
import { fetchAllKeywords } from '../../../../src/libs/store'
import Keywords from '../../../../src/pages/keywords/[slug]/index'
import { Keyword } from '../../../../src/types/keyword'
import { SITE_DOMAIN, SITE_TITLE } from '../../../../src/utils/env'

describe(`KEYWORD ARTICLE PAGE 1/7 (pages/keywords/[slug]/index.tsx)`, () => {
  afterEach(cleanup)

  test('snapshot', async () => {
    const keywords = (await fetchAllKeywords()).contents
    const keyword = keywords.find((keyword) => keyword.slug === 'nextjs') as Keyword
    const posts = (await getKeywordPosts(keyword.slug)).slice(-1)
    const postLength = 84
    const pageProps = {
      url: `${SITE_DOMAIN}/keywords/${keyword.slug}`,
      type: 'keywords',
      title: `${keyword.slug} - ${SITE_TITLE}`,
      description: keyword.slug,
      noindex: true,
      keywords: keywords,
    }

    const { asFragment } = render(
      <Keywords pageProps={pageProps} posts={posts} postLength={postLength} keyword={keyword} />
    )
    const tree = asFragment()
    expect(tree).toMatchSnapshot()
  })
})
