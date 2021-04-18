import { cleanup, render } from '@testing-library/react'
import React from 'react'
import Error from '../../src/pages/500'

describe(`500 PAGE (pages/500.tsx)`, () => {
  afterEach(cleanup)

  test('snapshot', async () => {
    const { asFragment } = render(<Error />)
    const tree = asFragment()
    expect(tree).toMatchSnapshot()
  })
})
