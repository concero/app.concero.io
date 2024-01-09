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
}

export const buttonText: { [key in ButtonType]: string } = {
	[ButtonType.LOADING]: '',
	[ButtonType.SWAP]: 'button.swap',
	[ButtonType.ENTER_AMOUNT]: 'button.enterAmountToSwap',
	[ButtonType.LOW_BALANCE]: 'button.insufficientBalance',
	[ButtonType.LOW_GAS]: 'button.insufficientGas',
	[ButtonType.LOW_FEES]: 'button.insufficientFees',
	[ButtonType.CONNECT_WALLET]: 'button.connectWalletToSwap',
	[ButtonType.NO_ROUTES]: 'button.noRoutesFound',
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
}
