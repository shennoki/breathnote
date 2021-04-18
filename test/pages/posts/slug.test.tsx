import { cleanup, render } from '@testing-library/react'
import renderToString from 'next-mdx-remote/render-to-string'
import React from 'react'
import CustomImage from '../../../src/components/atoms/CustomImage'
import CustomLink from '../../../src/components/atoms/CustomLink'
import { fetchAllPosts } from '../../../src/libs/store'
import Post from '../../../src/pages/posts/[slug]'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const rehypePrism = require('@mapbox/rehype-prism')

describe(`ARTICLE PAGE (pages/posts/[slug].tsx)`, () => {
  afterEach(cleanup)

  test('snapshot', async () => {
    const components = {
      a: CustomLink,
      img: CustomImage,
    }

    let post = (await fetchAllPosts()).contents.slice(-1)[0]

    post = {
      ...post,
      body: await renderToString(post.body, {
        components,
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
