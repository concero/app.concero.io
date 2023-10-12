import { get } from '../client'
import { Filter, StakingState } from '../../components/screens/StakingScreen/stakingReducer/types'
import { Chain } from '../../components/cards/SwapCard/types'

function getChainsQuery(filter: Filter) {
	if (!filter) return ''
	const { chains } = filter
	if (!chains || chains.length === 0) return ''
	return `chain_id=${chains.map((chain: Chain) => chain.id).join(',')}`
}

function getApyQuery(filter: Filter) {
	if (!filter) return ''
	const { apy } = filter
	if (apy === undefined || apy === null) return ''
	return `apy=${apy}`
}

function getMyHoldingsQuery(stakingState: StakingState, address: string) {
	if (!stakingState) return ''
	const { filter } = stakingState
	const { my_holdings } = filter
	if (!my_holdings || !address) return ''
	return `byHoldingsOfAddress=${address}`
}

function getMyPositionsQuery(stakingState: StakingState, address: string) {
	if (!stakingState) return ''
	const { filter } = stakingState
	const { my_positions } = filter
	if (!my_positions || !address) return ''
	return `byPositionsOfAddress=${address}`
}

function getCategoryQuery(filter: Filter) {
	if (!filter) return ''
	const { category } = filter
	if (!category.length) return ''
	return `category=${category.join(',')}`
}

export async function fetchPools(stakingState: StakingState, address: string, offset: number, limit: number) {
	const { filter } = stakingState
	const urlParts = [
		`${process.env.CONCERO_API_URL}/pools`,
		getChainsQuery(filter),
		getApyQuery(filter),
		getMyHoldingsQuery(stakingState, address),
		getMyPositionsQuery(stakingState, address),
		getCategoryQuery(filter),
		'is_outlier=false',
		`offset=${offset}`,
		`limit=${limit}`,
	]
	const filteredUrl = urlParts.filter(part => part !== '')
	const url = `${filteredUrl.splice(0, 2).join('?')}&${filteredUrl.join('&')}`
	const response = await get(url)
	if (response.status !== 200) throw new Error(response.error)
	return response.data.data
}
