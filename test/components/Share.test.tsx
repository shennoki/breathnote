import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import Share from '../../src/components/Share'

describe(`Share`, () => {
  afterEach(() => {
    cleanup
  })

  test('link check', () => {
    render(<Share fullPath="https://blog.shinki.net/" />)

    expect(screen.getAllByRole('link')[0]).toHaveAttribute(
      'href',
      'https://twitter.com/share?url=https%3A%2F%2Fblog.shinki.net%2F'
    )
  })
})
