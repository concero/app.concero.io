import { pools } from '../../constants/pools'
import { get } from '../client'
import { timestampToLocalTime } from '../../utils/formatting'

const getPoolIdByTokensAddresses = (tokensAddresses: string[]): string | undefined => {
  return pools.find((p) => {
    return p.underlyingTokens?.some((address) => tokensAddresses.includes(address))
  })?.id
}

const standardizeItem = (item) => {
  return {
    time: timestampToLocalTime(Date.parse(item.timestamp) / 1000),
    value: item.apy,
  }
}

export const fetchTvlApyChartData = async (addresses: string[]) => {
  const poolId = getPoolIdByTokensAddresses(addresses)
  if (!poolId) throw new Error('Pool not found')
  const response = await get(`https://yields.llama.fi/chart/${poolId}`)
  if (response.status !== 200) throw new Error('Error fetching data')

  const apy = response.data.data.map((item) => standardizeItem(item))
  const tvlUsd = response.data.data.map((item) => standardizeItem(item))

  return {
    apy,
    tvlUsd,
  }
}
