import { type providers } from 'ethers'

export interface SwapInputProps {
	swapState: any
	swapDispatch: any
}

export type SwitchChainHookType = (requiredChainId: number) => Promise<providers.JsonRpcSigner>
