import { type Dispatch } from 'react'
import { type EarnAction, type EarnState } from '../../screens/EarnScreen/earnReducer/types'
import { fetchPools } from '../../../api/concero/fetchPools'

export async function getVaults(earnDispatch: Dispatch<EarnAction>, address: string, earnState: EarnState, offset: number, limit: number, isIpad: boolean): Promise<void> {
	earnDispatch({ type: 'SET_LOADING', payload: true })
	try {
		const pools = await fetchPools(earnState, address, offset, limit)
		earnDispatch({ type: 'SET_VAULTS', payload: pools })
		if (!isIpad) {
			earnDispatch({ type: 'SET_SELECTED_VAULT', payload: pools[0] })
		}
	} catch (error) {
		console.error(error)
		earnDispatch({ type: 'SET_VAULTS', payload: [] })
		earnDispatch({ type: 'SET_SELECTED_VAULT', payload: null })
	} finally {
		earnDispatch({ type: 'SET_LOADING', payload: false })
	}
}

export async function getMoreVaults(earnDispatch: Dispatch<any>, address, earnState: EarnState, offset: number, limit: number): Promise<void> {
	earnDispatch({ type: 'SET_LOADING', payload: true })
	try {
		const pools = await fetchPools(earnState, address, offset, limit)
		earnDispatch({ type: 'PUSH_VAULTS', payload: pools })
	} catch (error) {
		console.error(error)
		earnDispatch({ type: 'PUSH_VAULTS', payload: [] })
		earnDispatch({ type: 'SET_SELECTED_VAULT', payload: null })
	} finally {
		earnDispatch({ type: 'SET_LOADING', payload: false })
	}
}
