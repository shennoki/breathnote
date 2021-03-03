import { cleanup, render, screen } from '@testing-library/react'
import renderToString from 'next-mdx-remote/render-to-string'
import React from 'react'
import CustomImage from '../../../src/components/CustomImage'
import CustomLink from '../../../src/components/CustomLink'
import Post from '../../../src/pages/posts/[slug]'
import { ALL_POSTS } from '../../../src/scripts/store'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const rehypePrism = require('@mapbox/rehype-prism')

describe(`ARTICLE PAGE (pages/posts/[slug].tsx)`, () => {
  afterEach(() => {
    cleanup
  })

  test('snapshot', async () => {
    const components = {
      a: CustomLink,
      img: CustomImage,
    }
    let post = (await ALL_POSTS).contents.slice(-1)[0]
    post = {
      ...post,
      body: await renderToString(post.body, {
        components,
        mdxOptions: {
          rehypePlugins: [rehypePrism],
        },
      }),
    }
    const option = {
      pageType: 'post',
      fullPath: `https://blog.shinki.net/posts/${post.slug}`,
    }
    const { asFragment } = render(<Post post={post} option={option} />)
    const tree = asFragment()
    expect(tree).toMatchSnapshot()
  })

  test('integration', async () => {
    const components = {
      a: CustomLink,
      img: CustomImage,
    }
    let post = (await ALL_POSTS).contents.slice(-1)[0]
    post = {
      ...post,
      body: await renderToString(post.body, {
        components,
        mdxOptions: {
          rehypePlugins: [rehypePrism],
        },
      }),
    }
    const option = {
      pageType: 'post',
      fullPath: `https://blog.shinki.net/posts/${post.slug}`,
    }
    render(<Post post={post} option={option} />)

    // ヘッダーが存在する
    expect(screen.getByRole('banner')).toBeInTheDocument()
    // メインコンテンツが存在する
    expect(screen.getByRole('main')).toBeInTheDocument()
    // サイドコンテンツ (SHARE, CONTENTS, MORE) が存在する
    expect(screen.getAllByRole('complementary')).toHaveLength(3)
    // フッターが存在する
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()

    // h1属性が1個だけ存在する
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    // 記事が存在する
    expect(screen.getByRole('article')).toBeInTheDocument()
  })
})
