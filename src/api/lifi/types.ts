import { Settings } from '../../components/cards/SwapCard/swapReducer/types'
import { Direction } from '../../types/StandardRoute'

export interface FetchRoutesParams {
	from: Direction
	to: Direction
	settings: Settings
}
