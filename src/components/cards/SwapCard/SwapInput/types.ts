import { type providers } from 'ethers'
import { type SwapAction, type SwapState } from '../swapReducer/types'
import { type Dispatch } from 'react'

export interface SwapInputProps {
	swapState: SwapState
	swapDispatch: Dispatch<SwapAction>
	isNewSwapCardMode: boolean
	setTxDuration: (time: number | undefined) => void
}

export type SwitchChainHookType = (requiredChainId: number) => Promise<providers.JsonRpcSigner>
