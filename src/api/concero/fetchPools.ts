import { get } from '../client'
import { Filter, StakingState, UserBalance } from '../../components/screens/StakingScreen/stakingReducer/types'

function getChainsQuery(filter: Filter) {
  if (!filter) return ''
  const { chains } = filter
  if (!chains || chains.length === 0) return ''
  return `chain=${chains.map((chain) => chain.name).join(',')}`
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

function getunderlyingTokensQuery(stakingState: StakingState) {
  const { filter, userBalances } = stakingState
  if (!filter || !userBalances.length) return ''
  const { my_holdings } = filter
  if (!my_holdings) return ''
  return `underlyingTokens=${userBalances.map((token: UserBalance) => token.address).join(',')}`
}

export const fetchPools = async (stakingState: StakingState, offset: number, limit: number) => {
  const { filter } = stakingState
  const urlParts = [
    `${process.env.CONCERO_API_URL}/pools`,
    getChainsQuery(filter),
    getCompoundQuery(filter),
    getApyQuery(filter),
    getunderlyingTokensQuery(stakingState),
    `offset=${offset}`,
    `limit=${limit}`,
  ]
  const filteredUrl = urlParts.filter((part) => part !== '')
  const url = `${filteredUrl.splice(0, 2).join('?')}&${filteredUrl.join('&')}`
  const response = await get(url)
  if (response.status !== 200) throw new Error(response.error)
  return response.data.data
}
