import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import Keyword from '../../../../src/pages/keywords/[slug]/index'
import { getKeywordPosts } from '../../../../src/scripts/getter'
import { ALL_KEYWORDS } from '../../../../src/scripts/store'

describe(`KEYWORD ARTICLE PAGE 1/7 (pages/keywords/[slug]/index.tsx)`, () => {
  afterEach(() => {
    cleanup
  })

  test('snapshot', async () => {
    const keyword = (await ALL_KEYWORDS).contents.slice(-1)[0]
    const posts = (await getKeywordPosts(keyword.slug)).slice(-1)
    const allPostLength = 42
    const option = {
      pageType: 'keyword',
      fullPath: `https://blog.shinki.net/keywords/${keyword.slug}`,
    }
    const { asFragment } = render(
      <Keyword posts={posts} allPostLength={allPostLength} keyword={keyword} option={option} />
    )
    const tree = asFragment()
    expect(tree).toMatchSnapshot()
  })

  test('integration', async () => {
    const keyword = (await ALL_KEYWORDS).contents.slice(-1)[0]
    const posts = (await getKeywordPosts(keyword.slug)).slice(-1)
    const allPostLength = 42
    const option = {
      pageType: 'keyword',
      fullPath: `https://blog.shinki.net/keywords/${keyword.slug}`,
    }
    render(<Keyword posts={posts} allPostLength={allPostLength} keyword={keyword} option={option} />)

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
