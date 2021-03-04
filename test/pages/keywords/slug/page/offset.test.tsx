import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import Keyword from '../../../../../src/pages/keywords/[slug]/page/[offset]'
import { getKeywordPosts } from '../../../../../src/scripts/getter'
import { ALL_KEYWORDS } from '../../../../../src/scripts/store'

describe(`KEYWORD ARTICLE PAGE 4/7 (pages/keywords/[slug]/page/[offset].tsx)`, () => {
  afterEach(() => {
    cleanup
  })

  test('snapshot', async () => {
    const offset = 4
    const keyword = (await ALL_KEYWORDS).contents.slice(-1)[0]
    const posts = (await getKeywordPosts(keyword.slug)).slice(-6)
    const allPostLength = 42
    const option = {
      pageType: 'keyword',
      fullPath: `https://blog.shinki.net/keywords/${keyword.slug}/page/${offset}`,
    }
    const { asFragment } = render(
      <Keyword posts={posts} allPostLength={allPostLength} keyword={keyword} option={option} offset={offset} />
    )
    const tree = asFragment()
    expect(tree).toMatchSnapshot()
  })

  test('integration', async () => {
    const offset = 4
    const keyword = (await ALL_KEYWORDS).contents.slice(-1)[0]
    const posts = (await getKeywordPosts(keyword.slug)).slice(-6)
    const allPostLength = 42
    const option = {
      pageType: 'keyword',
      fullPath: `https://blog.shinki.net/keywords/${keyword.slug}/page/${offset}`,
    }
    render(<Keyword posts={posts} allPostLength={allPostLength} keyword={keyword} option={option} offset={offset} />)

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
    // ページネーションが存在する
    expect(screen.getByRole('navigation', { name: 'pagination' })).toBeInTheDocument()
  })
})
