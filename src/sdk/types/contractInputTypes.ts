import { type Address } from 'viem'

export interface BridgeData {
	tokenType: number
	amount: bigint
	minAmount: bigint
	dstChainSelector: bigint
	receiver: Address
}

export interface InputSwapData {
	tokenType: number
	fromToken: Address
	fromAmount: bigint
	toToken: Address
	toAmount: bigint
	toAmountMin: bigint
}

export type TxName = 'swap' | 'bridge' | 'swapAndBridge'

export interface InputRouteData {
	bridgeData: BridgeData | null
	srcSwapData: InputSwapData[]
	dstSwapData: InputSwapData[]
}

export type SwapArgs = Array<InputSwapData[] | BridgeData | bigint>
