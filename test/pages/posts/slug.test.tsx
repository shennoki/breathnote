import { cleanup, render } from '@testing-library/react'
import { serialize } from 'next-mdx-remote/serialize'
import React from 'react'
import { fetchAllPosts } from '../../../src/libs/store'
import Post from '../../../src/pages/posts/[slug]'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const rehypePrism = require('@mapbox/rehype-prism')
jest.mock('rehype-katex', () => ({}))

describe(`ARTICLE PAGE (pages/posts/[slug].tsx)`, () => {
  afterEach(cleanup)

  test('snapshot', async () => {
    let post = (await fetchAllPosts()).contents.slice(-1)[0]

    post = {
      ...post,
      body: await serialize(post.body, {
        mdxOptions: {
          rehypePlugins: [rehypePrism],
        },
      }),
    }

    const { asFragment } = render(<Post post={post} />)
    const tree = asFragment()
    expect(tree).toMatchSnapshot()
  })
})
