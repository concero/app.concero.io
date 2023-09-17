import { get } from '../client'
import { Filter, StakingState } from '../../components/screens/StakingScreen/stakingReducer/types'

function getChainsQuery(filter: Filter) {
  if (!filter) return ''
  const { chains } = filter
  if (!chains || chains.length === 0) return ''
  return `chainId=${chains.map((chain) => chain.id).join(',')}`
}

function getCompoundQuery(filter: Filter) {
  if (!filter) return ''
  const { compound } = filter
  if (!compound) return ''
  return 'exposure=multi'
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

export async function fetchPools(stakingState: StakingState, address: string, offset: number, limit: number) {
  const { filter } = stakingState
  const urlParts = [
    `${process.env.CONCERO_API_URL}/pools`,
    getChainsQuery(filter),
    getCompoundQuery(filter),
    getApyQuery(filter),
    getMyHoldingsQuery(stakingState, address),
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
