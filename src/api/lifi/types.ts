import { type Settings } from '../../components/cards/SwapCard/swapReducer/types'
import { type Direction } from '../../types/StandardRoute'

export interface FetchRoutesParams {
	from: Direction
	to: Direction
	settings: Settings
}
