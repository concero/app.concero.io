import { get } from '../client'
import { Filter, StakingState } from '../../components/screens/StakingScreen/stakingReducer/types'

function getChainsQuery(filter: Filter) {
  if (!filter) return ''
  const { chains } = filter
  if (!chains || chains.length === 0) return ''
  return `chainId=${chains.map((chain) => chain.id).join(',')}`
}

function getApyQuery(filter: Filter) {
  if (!filter) return ''
  const { apy } = filter
  if (apy === undefined || apy === null) return ''
  return `apy=${apy}`
}

function getMyHoldingsQuery(stakingState: StakingState, address) {
  if (!stakingState) return ''
  const { filter } = stakingState
  const { my_holdings } = filter
  if (!my_holdings || !address) return ''
  return `byHoldingsOfAddress=${address}`
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
    getCategoryQuery(filter),
    'widoSupported=true',
    'outlier=false',
    `offset=${offset}`,
    `limit=${limit}`,
  ]
  const filteredUrl = urlParts.filter((part) => part !== '')
  const url = `${filteredUrl.splice(0, 2).join('?')}&${filteredUrl.join('&')}`
  const response = await get(url)
  if (response.status !== 200) throw new Error(response.error)
  return response.data.data
}
