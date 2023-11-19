import { fireEvent, render } from '@testing-library/react'
import { SwapButton } from '../../components/buttons/SwapButton/SwapButton'
import jest from 'jest-mock'
import { buttonText, ButtonType } from '../../components/buttons/SwapButton/constants'

describe('SwapButton component', () => {
	const mockProps = {
		swapState: {
			isLoading: false,
			from: {
				amount: 0,
			},
		},
		isConnected: true,
		onClick: jest.fn(),
	}

	test('renders SwapButton correctly', () => {
		const { getByText } = render(<SwapButton {...mockProps} />)
		expect(getByText(buttonText[ButtonType.ENTER_AMOUNT])).toBeInTheDocument()
	})

	test('triggers onClick function when button is clicked', () => {
		const { getByText } = render(<SwapButton {...mockProps} />)
		const button = getByText(buttonText[ButtonType.ENTER_AMOUNT])
		fireEvent.click(button)
		expect(mockProps.onClick).toHaveBeenCalledTimes(1)
	})

	test('render connect wallet button', () => {
		mockProps.isConnected = false
		const { getByText } = render(<SwapButton {...mockProps} />)
		expect(getByText(buttonText[ButtonType.CONNECT_WALLET])).toBeInTheDocument()
	})
})
