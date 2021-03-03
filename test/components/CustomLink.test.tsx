import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import CustomLink from '../../src/components/CustomLink'

describe(`CustomLink`, () => {
  afterEach(() => {
    cleanup
  })

  test('conversion check', () => {
    render(
      <>
        <CustomLink href="/keywords">internal link</CustomLink>
        <CustomLink href="https://blog.shinki.net/">external link</CustomLink>
      </>
    )

    expect(screen.getByText(/internal/)).not.toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.getByText(/external/)).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
