import { Dispatch } from 'react'
import { fetchStakingChartData } from '../../../api/defilama/fetchStakingChartData'
import { Vault } from '../../screens/StakingScreen/stakingReducer/types'

interface FetchDataParams {
	selectedVault: Vault
	dispatch: Dispatch<any>
}

export async function getData({ selectedVault, dispatch }: FetchDataParams) {
	dispatch({ type: 'SET_LOADING', payload: true })
	try {
		const response = await fetchStakingChartData(selectedVault.data.defiLlamaPoolId)
		dispatch({ type: 'SET_RESPONSE', payload: response })
	} catch (e) {
		console.log(e)
	} finally {
		dispatch({ type: 'SET_LOADING', payload: false })
	}
}
