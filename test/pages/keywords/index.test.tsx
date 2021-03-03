import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import Keywords from '../../../src/pages/keywords/index'
import { ALL_KEYWORDS } from '../../../src/scripts/store'

describe(`KEYWORDS PAGE (pages/keywords/index.tsx)`, () => {
  afterEach(() => {
    cleanup
  })

  test('snapshot', async () => {
    const keywords = (await ALL_KEYWORDS).contents.slice(-2)
    const option = {
      pageType: 'keywords',
      fullPath: `https://blog.shinki.net/keywords`,
    }
    const { asFragment } = render(<Keywords keywords={keywords} option={option} />)
    const tree = asFragment()
    expect(tree).toMatchSnapshot()
  })

  test('integration', async () => {
    const keywords = (await ALL_KEYWORDS).contents.slice(-2)
    const option = {
      pageType: 'keywords',
      fullPath: `https://blog.shinki.net/keywords`,
    }
    render(<Keywords keywords={keywords} option={option} />)

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
  })
})
