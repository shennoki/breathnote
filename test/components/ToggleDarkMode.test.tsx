import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import ToggleDarkMode from '../../src/components/ToggleDarkMode'

describe(`ToggleDarkMode`, () => {
  afterEach(() => {
    cleanup
  })

  test('light to dark', () => {
    render(<ToggleDarkMode />)

    localStorage.theme = 'light'
    expect(screen.getByRole('checkbox')).not.toBeChecked()
    userEvent.click(screen.getByRole('checkbox'))
    expect(screen.getByRole('checkbox')).toBeChecked()
    expect(localStorage.theme).toBe('dark')
  })

  test('dark to light', () => {
    render(<ToggleDarkMode />)

    localStorage.theme = 'dark'
    expect(screen.getByRole('checkbox')).toBeChecked()
    userEvent.click(screen.getByRole('checkbox'))
    expect(screen.getByRole('checkbox')).not.toBeChecked()
    expect(localStorage.theme).toBe('light')
  })
})
