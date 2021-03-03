import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import Error from '../../src/pages/404'

describe(`404 (pages/404.tsx)`, () => {
  afterEach(() => {
    cleanup
  })

  test('snapshot', async () => {
    const option = {
      pageType: '404',
      fullPath: `https://blog.shinki.net/404`,
    }
    const { asFragment } = render(<Error option={option} />)
    const tree = asFragment()
    expect(tree).toMatchSnapshot()
  })

  test('integration', async () => {
    const option = {
      pageType: '404',
      fullPath: `https://blog.shinki.net/404`,
    }
    render(<Error option={option} />)

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
