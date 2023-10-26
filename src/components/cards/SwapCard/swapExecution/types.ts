import { BestRouteResponse } from 'rango-types/src/api/main/routing'
import { Dispatch } from 'react'
import { SwapAction } from '../swapReducer/types'
import { SwitchChainHookType } from '../SwapInput/types'
import { GetChainByProviderSymbolI } from '../../../../hooks/DataContext/types'

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
