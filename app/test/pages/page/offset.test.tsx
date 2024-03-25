import { cleanup, render } from '@testing-library/react'
import { fetchAllKeywords, fetchAllPosts } from '../../../src/libs/store'
import Home from '../../../src/pages/page/[offset]'
import { SITE_DESCRIPTION, SITE_DOMAIN, SITE_SUBTITLE, SITE_TITLE } from '../../../src/utils/env'

describe(`TOP PAGE 4/7 (pages/page/[offset].tsx)`, () => {
  afterEach(cleanup)

  test('snapshot', async () => {
    const posts = (await fetchAllPosts()).contents.slice(-5)
    const offset = 4
    const postLength = 84
    const pageProps = {
      url: `${SITE_DOMAIN}/page/${offset}`,
      type: 'home',
      title: `${SITE_TITLE} (${offset}) - ${SITE_SUBTITLE}`,
      description: SITE_DESCRIPTION,
      keywords: (await fetchAllKeywords()).contents,
    }

    const { asFragment } = render(<Home pageProps={pageProps} posts={posts} postLength={postLength} offset={offset} />)
    const tree = asFragment()
    expect(tree).toMatchSnapshot()
  })
})
