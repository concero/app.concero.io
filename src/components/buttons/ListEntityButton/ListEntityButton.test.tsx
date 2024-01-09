import { render, screen } from '@testing-library/react'
import { ListEntityButton } from './ListEntityButton'
import { it } from 'vitest'

it('renders ListEntityButton component', () => {
	const item = { id: 1, name: 'Test Entity', symbol: 'TEST', logoURI: 'https://example.com/logo.png' }
	render(<ListEntityButton item={item} isSelected={false} onSelect={() => {}} />)
	const buttonElement = screen.getByText('Test Entity')
	expect(buttonElement).toBeInTheDocument()
})
