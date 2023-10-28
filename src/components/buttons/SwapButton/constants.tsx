import { IconArrowsUpDown, IconWallet } from '@tabler/icons-react'

export enum ButtonType {
	LOADING = 1,
	SWAP = 2,
	ENTER_AMOUNT = 3,
	LOW_BALANCE = 4,
	LOW_GAS = 5,
	LOW_FEES = 6,
	CONNECT_WALLET = 7,
	NO_ROUTES = 8,
	SOMETHING_WENT_WRONG = 9,
	CANCELED = 10,
}

export const buttonText: { [key in ButtonType]: string } = {
	[ButtonType.LOADING]: '',
	[ButtonType.SWAP]: 'Swap',
	[ButtonType.ENTER_AMOUNT]: 'Enter amount to swap',
	[ButtonType.LOW_BALANCE]: 'Insufficient balance',
	[ButtonType.LOW_GAS]: 'Insufficient gas',
	[ButtonType.LOW_FEES]: 'Insufficient fees',
	[ButtonType.CONNECT_WALLET]: 'Connect wallet to swap',
	[ButtonType.NO_ROUTES]: 'No routes found',
	[ButtonType.SOMETHING_WENT_WRONG]: 'Something went wrong',
	[ButtonType.CANCELED]: 'Cancelled by user',
}

export const isButtonDisabled: { [key in ButtonType]: boolean } = {
	[ButtonType.LOADING]: true,
	[ButtonType.SWAP]: false,
	[ButtonType.ENTER_AMOUNT]: true,
	[ButtonType.LOW_BALANCE]: true,
	[ButtonType.LOW_GAS]: true,
	[ButtonType.LOW_FEES]: true,
	[ButtonType.CONNECT_WALLET]: true,
	[ButtonType.NO_ROUTES]: true,
	[ButtonType.SOMETHING_WENT_WRONG]: true,
	[ButtonType.CANCELED]: true,
}

export const buttonStyleClass: { [key in ButtonType]: string } = {
	[ButtonType.LOADING]: 'loading',
	[ButtonType.SWAP]: 'swap',
	[ButtonType.ENTER_AMOUNT]: 'disabled',
	[ButtonType.LOW_BALANCE]: 'wrong',
	[ButtonType.LOW_GAS]: 'wrong',
	[ButtonType.LOW_FEES]: 'wrong',
	[ButtonType.CONNECT_WALLET]: 'disabled',
	[ButtonType.NO_ROUTES]: 'disabled',
	[ButtonType.SOMETHING_WENT_WRONG]: 'wrong',
	[ButtonType.CANCELED]: 'canceled',
}

export const iconComponent: Record<string, JSX.Element> | Record<string, Record<string, JSX.Element>> = {
	Wallet: <IconWallet size={18} color="white" />,
	ArrowsUpDown: <IconArrowsUpDown size={18} color="white" />,
}
