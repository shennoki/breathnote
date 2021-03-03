import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import Pagination from '../../src/components/Pagination'

describe(`Pagination`, () => {
  afterEach(() => {
    cleanup
  })

  test('link check', () => {
    render(<Pagination allPostLength={54} pageType="keyword" offset={5} slug="nextjs" />)

    expect(screen.getAllByRole('link').slice(-1)[0]).toHaveAttribute('href', '/keywords/nextjs/page/9')
  })

  test('page 2 (18 Articles)', () => {
    render(<Pagination allPostLength={18} pageType="home" offset={2} />)

    const pageNum = ['1', '2', '3']
    const items = screen.getAllByRole('listitem')

    expect(items).toHaveLength(pageNum.length)
    items.forEach((item, index) => {
      expect(item).toHaveTextContent(pageNum[index])
    })
  })

  test('page 5 (54 Articles)', () => {
    render(<Pagination allPostLength={54} pageType="home" offset={5} />)

    const pageNum = ['1', '...', '4', '5', '6', '...', '9']
    const items = screen.getAllByRole('listitem')

    expect(items).toHaveLength(pageNum.length)
    items.forEach((item, index) => {
      expect(item).toHaveTextContent(pageNum[index])
    })
  })

  test('page 2 (54 Articles)', () => {
    render(<Pagination allPostLength={54} pageType="home" offset={2} />)

    const pageNum = ['1', '2', '3', '...', '9']
    const items = screen.getAllByRole('listitem')

    expect(items).toHaveLength(pageNum.length)
    items.forEach((item, index) => {
      expect(item).toHaveTextContent(pageNum[index])
    })
  })

  test('page 8 (54 Articles)', () => {
    render(<Pagination allPostLength={54} pageType="home" offset={8} />)

    const pageNum = ['1', '...', '7', '8', '9']
    const items = screen.getAllByRole('listitem')

    expect(items).toHaveLength(pageNum.length)
    items.forEach((item, index) => {
      expect(item).toHaveTextContent(pageNum[index])
    })
  })
})
