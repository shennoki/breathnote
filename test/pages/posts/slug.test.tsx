// TODO: next-mdx-remoteをJestで読み取れないので一旦放置

// import rehypePrism from '@mapbox/rehype-prism'
import { cleanup } from '@testing-library/react'
// import { cleanup, render } from '@testing-library/react'
// import { serialize } from 'next-mdx-remote/serialize'
// import React from 'react'
// import { fetchAllPosts } from '../../../src/libs/store'
// import Post from '../../../src/pages/posts/[slug]'

jest.mock('rehype-katex', () => ({}))

describe(`ARTICLE PAGE (pages/posts/[slug].tsx)`, () => {
  afterEach(cleanup)

  test('snapshot', async () => {
    // const post = (await fetchAllPosts()).contents.slice(-1)[0]
    //
    // post = {
    //   ...post,
    //   body: await serialize(post.body, {
    //     mdxOptions: {
    //       rehypePlugins: [rehypePrism],
    //     },
    //   }),
    // }
    //
    // const { asFragment } = render(<Post post={post} />)
    // const tree = asFragment()
    // expect(tree).toMatchSnapshot()
  })
})
