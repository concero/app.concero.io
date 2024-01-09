import { type FilterDispatchType } from '../contants'

export interface FilterState {
	isChainsModalOpened: boolean
	isCategoriesModalOpened: boolean
	isApyModalOpened: boolean
}

export type FilterAction =
	| { type: FilterDispatchType.setIsChainsModalOpened; payload: boolean }
	| { type: FilterDispatchType.setIsApyModalOpened; payload: boolean }
	| { type: FilterDispatchType.setIsCategoryModalOpened; payload: boolean }
