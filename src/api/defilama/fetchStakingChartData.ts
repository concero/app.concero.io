import { pools } from '../../constants/pools'
import { get } from '../client'

const getPoolIdByTokensAddresses = (tokensAddresses: string[]): string | undefined => {
  return pools.find((p) => {
    return p.underlyingTokens?.some((address) => tokensAddresses.includes(address))
  })?.id
}

export const fetchStakingChartData = async (addresses: string[]) => {
  const poolId = getPoolIdByTokensAddresses(addresses)
  if (!poolId) throw new Error('Pool not found')
  const response = await get(`https://yields.llama.fi/chart/${poolId}`)
  if (response.status !== 200) throw new Error('Error fetching data')
  return response
}
