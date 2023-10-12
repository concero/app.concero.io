import { Dispatch } from 'react'
import { StakingAction, StakingState } from '../../screens/StakingScreen/stakingReducer/types'
import { fetchPools } from '../../../api/concero/fetchPools'

export async function getVaults(
	stakingDispatch: Dispatch<StakingAction>,
	address: string,
	stakingState: StakingState,
	offset: number,
	limit: number,
	isIpad: boolean,
): Promise<void> {
	stakingDispatch({ type: 'SET_LOADING', payload: true })
	try {
		const pools = await fetchPools(stakingState, address, offset, limit)
		stakingDispatch({ type: 'SET_VAULTS', payload: pools })
		if (!isIpad) {
			stakingDispatch({ type: 'SET_SELECTED_VAULT', payload: pools[0] })
		}
	} catch (error) {
		console.error(error)
		stakingDispatch({ type: 'SET_VAULTS', payload: [] })
		stakingDispatch({ type: 'SET_SELECTED_VAULT', payload: null })
	} finally {
		stakingDispatch({ type: 'SET_LOADING', payload: false })
	}
}

export async function getMoreVaults(stakingDispatch: Dispatch<any>, address, stakingState: StakingState, offset: number, limit: number): Promise<void> {
	stakingDispatch({ type: 'SET_LOADING', payload: true })
	try {
		const pools = await fetchPools(stakingState, address, offset, limit)
		stakingDispatch({ type: 'PUSH_VAULTS', payload: pools })
	} catch (error) {
		console.error(error)
		stakingDispatch({ type: 'PUSH_VAULTS', payload: [] })
		stakingDispatch({ type: 'SET_SELECTED_VAULT', payload: null })
	} finally {
		stakingDispatch({ type: 'SET_LOADING', payload: false })
	}
}
