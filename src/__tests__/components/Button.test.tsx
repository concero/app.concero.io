import { fireEvent, render, screen } from '@testing-library/react'
import { Lottie } from 'lottie-react'

import { Button } from '../../components/buttons/Button/Button'

vitest.mock('lottie-react', () => ({
  __esModule: true,
  Lottie: () => <div>Lottie animation</div>,
}))

describe('Button', () => {
  it('renders without crashing', () => {
    render(<Button />)
    expect(document.body.contains(document.querySelector('button'))).toBe(true)
  })

  it('handles click events', () => {
    const onClickMock = vitest.fn()
    render(<Button onClick={onClickMock} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('displays children content', () => {
    const childrenText = 'Button text'
    render(<Button>{childrenText}</Button>)
    expect(screen.getByText(childrenText)).toBeVisible()
  })

  it('displays left icon', () => {
    const leftIconName = 'ArrowsUpDown'
    render(<Button leftIcon={{ name: 'ArrowUpLeft' }} />)

    expect(screen.getByRole('svg', { name: 'ArrowUpLeft' })).toBeVisible()
  })
})
