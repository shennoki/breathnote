import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import Home from '../../../src/pages/page/[offset]'
import { ALL_POSTS } from '../../../src/scripts/store'

describe(`TOP PAGE 4/7 (pages/page/[offset].tsx)`, () => {
  afterEach(() => {
    cleanup
  })

  test('snapshot', async () => {
    const offset = 4
    const posts = (await ALL_POSTS).contents.slice(-3)
    const allPostLength = 42
    const option = {
      pageType: 'home',
      fullPath: `https://blog.shinki.net/page/${offset}`,
    }
    const { asFragment } = render(<Home posts={posts} allPostLength={allPostLength} option={option} offset={offset} />)
    const tree = asFragment()
    expect(tree).toMatchSnapshot()
  })

  test('integration', async () => {
    const offset = 4
    const posts = (await ALL_POSTS).contents.slice(-3)
    const allPostLength = 42
    const option = {
      pageType: 'home',
      fullPath: `https://blog.shinki.net/page/${offset}`,
    }
    render(<Home posts={posts} allPostLength={allPostLength} option={option} offset={offset} />)

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
    // 記事が1個以上存在する
    expect(screen.getAllByRole('article')).not.toHaveLength(0)
    // ページネーションが存在する
    expect(screen.getByRole('navigation', { name: 'pagination' })).toBeInTheDocument()
  })
})
