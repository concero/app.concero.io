import { IconArrowsUpDown, IconGasStation, IconWallet } from '@tabler/icons-react'
import { type ReactNode } from 'react'

export enum ButtonType {
	LOADING = 1,
	SWAP = 2,
	ENTER_AMOUNT = 3,
	LOW_BALANCE = 4,
	LOW_GAS = 5,
	LOW_FEES = 6,
	CONNECT_WALLET = 7,
	NO_ROUTES = 8,
	REVIEW = 9,
	FETCH_BALANCES_LOADING = 10,
	CONNECT_WALLET_BRIGHT = 11,
}

export const buttonText: { [key in ButtonType]: string } = {
	[ButtonType.LOADING]: 'button.findingRoutes',
	[ButtonType.SWAP]: 'button.swap',
	[ButtonType.ENTER_AMOUNT]: 'button.enterAmountToSwap',
	[ButtonType.LOW_BALANCE]: 'button.insufficientBalance',
	[ButtonType.LOW_GAS]: 'button.insufficientGas',
	[ButtonType.LOW_FEES]: 'button.insufficientFees',
	[ButtonType.CONNECT_WALLET]: 'button.connectWalletToSwap',
	[ButtonType.NO_ROUTES]: 'button.noRoutesFound',
	[ButtonType.REVIEW]: 'button.reviewSwap',
	[ButtonType.FETCH_BALANCES_LOADING]: '',
	[ButtonType.CONNECT_WALLET_BRIGHT]: 'button.connectWalletToSwap',
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
	[ButtonType.REVIEW]: false,
	[ButtonType.FETCH_BALANCES_LOADING]: true,
	[ButtonType.CONNECT_WALLET_BRIGHT]: false,
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
	[ButtonType.REVIEW]: 'swap',
	[ButtonType.FETCH_BALANCES_LOADING]: 'loading',
	[ButtonType.CONNECT_WALLET_BRIGHT]: 'swap',
}

export const iconComponent: { [key in ButtonType]: ReactNode | null } = {
	[ButtonType.LOADING]: null,
	[ButtonType.SWAP]: <IconArrowsUpDown size={18} color="white" />,
	[ButtonType.ENTER_AMOUNT]: null,
	[ButtonType.LOW_BALANCE]: <IconWallet size={18} color="white" />,
	[ButtonType.LOW_GAS]: <IconGasStation size={18} color="white" />,
	[ButtonType.LOW_FEES]: <IconWallet size={18} color="white" />,
	[ButtonType.CONNECT_WALLET]: null,
	[ButtonType.NO_ROUTES]: null,
	[ButtonType.REVIEW]: <IconArrowsUpDown size={18} color="white" />,
	[ButtonType.FETCH_BALANCES_LOADING]: null,
	[ButtonType.CONNECT_WALLET_BRIGHT]: <IconWallet size={18} color="white" />,
}
