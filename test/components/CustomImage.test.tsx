import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import CustomImage from '../../src/components/CustomImage'

const mock = {
  src: 'https://images.microcms-assets.io/assets/img.png',
  width: '850',
  height: '445',
  alt: 'imagealt',
}

describe(`CustomImage`, () => {
  afterEach(() => {
    cleanup
  })

  test('conversion check', () => {
    render(<CustomImage src={mock.src} width={mock.width} height={mock.height} alt={mock.alt} />)

    expect(screen.getByRole('presentation', { hidden: true })).toBeInTheDocument()
  })
})
