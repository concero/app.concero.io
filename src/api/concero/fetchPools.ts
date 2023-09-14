import { get } from '../client'
import { Filter } from '../../components/screens/StakingScreen/stakingReducer/types'

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

export const fetchPools = async (filter: Filter) => {
  const urlParts = [`${process.env.CONCERO_API_URL}/pools`, getChainsQuery(filter), getCompoundQuery(filter), getApyQuery(filter), 'offset=0', 'limit=15']
  const filteredUrl = urlParts.filter((part) => part !== '')
  const url = `${filteredUrl.splice(0, 2).join('?')}&${filteredUrl.join('&')}`
  const response = await get(url)
  if (response.status !== 200) throw new Error(response.error)
  return response.data.data
}
