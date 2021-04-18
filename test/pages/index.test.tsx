import { cleanup, render } from '@testing-library/react'
import React from 'react'
import { fetchAllKeywords, fetchAllPosts } from '../../src/libs/store'
import Home from '../../src/pages/index'
import { SITE_DESCRIPTION, SITE_DOMAIN, SITE_SUBTITLE, SITE_TITLE } from '../../src/utils/env'

describe(`TOP PAGE 1/7 (pages/index.tsx)`, () => {
  afterEach(cleanup)

  test('snapshot', async () => {
    const posts = (await fetchAllPosts()).contents.slice(-5)
    const postLength = 84
    const pageProps = {
      url: `${SITE_DOMAIN}/`,
      type: 'home',
      title: `${SITE_TITLE} - ${SITE_SUBTITLE}`,
      description: SITE_DESCRIPTION,
      keywords: (await fetchAllKeywords()).contents,
    }
    const { asFragment } = render(<Home pageProps={pageProps} posts={posts} postLength={postLength} />)
    const tree = asFragment()
    expect(tree).toMatchSnapshot()
  })
})
