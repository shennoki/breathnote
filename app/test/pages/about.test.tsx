import { cleanup, render } from '@testing-library/react'
import React from 'react'
import About from '../../src/pages/about'

describe(`ABOUT PAGE (pages/about.tsx)`, () => {
  afterEach(cleanup)

  test('snapshot', async () => {
    const { asFragment } = render(<About />)
    const tree = asFragment()
    expect(tree).toMatchSnapshot()
  })
})
