import { type StandardRoute } from '../../../../types/StandardRoute'
import { type Settings, type SwapAction, type SwapStateDirection } from '../swapReducer/types'
import { type Dispatch } from 'react'

export interface GetLifiRoutes {
	routes: StandardRoute[] | []
	from: SwapStateDirection
	to: SwapStateDirection
	settings: Settings
	swapDispatch: Dispatch<SwapAction>
}

export interface PopulateRoutes {
	routes: StandardRoute[] | []
	from: SwapStateDirection
	swapDispatch: Dispatch<SwapAction>
}

export interface GetRangoRoutes {
	routes: StandardRoute[] | []
	from: SwapStateDirection
	to: SwapStateDirection
	settings: Settings
	swapDispatch: Dispatch<SwapAction>
}
