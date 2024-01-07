import { type BestRouteResponse } from 'rango-types/src/api/main/routing'
import { type Dispatch } from 'react'
import { type SwapAction } from '../swapReducer/types'
import { type SwitchChainHookType } from '../SwapInput/types'
import { type GetChainByProviderSymbolI } from '../../../../hooks/DataContext/types'

export interface ExecuteRangoRouteProps {
	route: BestRouteResponse
	address: string
	from: any
	settings: any
	swapDispatch: Dispatch<SwapAction>
	switchChainHook: SwitchChainHookType
	getChainByProviderSymbol: GetChainByProviderSymbolI
}

export interface CreateTransactionProps {
	route: BestRouteResponse
	address: string
	step: number
	from: any
	settings: any
	switchChainHook: SwitchChainHookType
	swapDispatch: Dispatch<SwapAction>
	getChainByProviderSymbol: GetChainByProviderSymbolI
}
