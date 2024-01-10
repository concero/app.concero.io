import { type Dispatch } from 'react'
import { FilterCategory, type EarnAction } from '../../../screens/EarnScreen/earnReducer/types'

export const resetFilter = (dispatch: Dispatch<EarnAction>) => {
	dispatch({ type: 'SET_FILTER', payload: { filter: FilterCategory.all, value: true } })
	dispatch({ type: 'SET_FILTER', payload: { filter: FilterCategory.my_holdings, value: false } })
	dispatch({ type: 'SET_FILTER', payload: { filter: FilterCategory.my_positions, value: false } })
	dispatch({ type: 'SET_FILTER', payload: { filter: FilterCategory.chains, value: [] } })
	dispatch({ type: 'SET_FILTER', payload: { filter: FilterCategory.apy, value: '' } })
	dispatch({ type: 'SET_FILTER', payload: { filter: FilterCategory.category, value: [] } })
}
