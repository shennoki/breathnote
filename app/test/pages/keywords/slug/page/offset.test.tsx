import { cleanup, render } from '@testing-library/react'
import React from 'react'
import { getKeywordPosts } from '../../../../../src/libs/requests'
import { fetchAllKeywords } from '../../../../../src/libs/store'
import Keywords from '../../../../../src/pages/keywords/[slug]/page/[offset]'
import { Keyword } from '../../../../../src/types/keyword'
import { SITE_DOMAIN, SITE_TITLE } from '../../../../../src/utils/env'

describe(`KEYWORD ARTICLE PAGE 4/7 (pages/keywords/[slug]/page/[offset].tsx)`, () => {
  afterEach(cleanup)

  test('snapshot', async () => {
    const keywords = (await fetchAllKeywords()).contents
    const keyword = keywords.find((keyword) => keyword.slug === 'nextjs') as Keyword
    const posts = (await getKeywordPosts(keyword.slug)).slice(-1)
    const postLength = 84
    const offset = 4
    const pageProps = {
      url: `${SITE_DOMAIN}/keywords/${keyword.slug}/page/${offset}`,
      type: 'keywords',
      title: `${keyword.name} (${offset}) - ${SITE_TITLE}`,
      description: keyword.description,
      noindex: true,
      keywords: keywords,
    }

    const { asFragment } = render(
      <Keywords pageProps={pageProps} posts={posts} postLength={postLength} keyword={keyword} offset={offset} />
    )
    const tree = asFragment()
    expect(tree).toMatchSnapshot()
  })
})
