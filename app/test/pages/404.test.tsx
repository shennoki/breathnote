import { cleanup, render } from '@testing-library/react'
import React from 'react'
import Error from '../../src/pages/404'

describe(`404 (pages/404.tsx)`, () => {
  afterEach(cleanup)

  test('snapshot', async () => {
    const { asFragment } = render(<Error />)
    const tree = asFragment()
    expect(tree).toMatchSnapshot()
  })
})
