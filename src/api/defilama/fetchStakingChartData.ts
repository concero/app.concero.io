import { get, post } from '../client'

const getPoolIdByTokensAddresses = async (tokensAddresses: string[]): string | undefined => {
  const response = await post('http://localhost:4000/api/pools', {
    underlyingTokens: tokensAddresses,
  })
  if (response.status !== 200) throw new Error('Error fetching data')
  return response.data.data[0]?.pool
}

export const fetchStakingChartData = async (addresses: string[]) => {
  const poolId = await getPoolIdByTokensAddresses(addresses)
  if (!poolId) throw new Error('Pool not found')
  const response = await get(`https://yields.llama.fi/chart/${poolId}`)
  if (response.status !== 200) throw new Error('Error fetching data')
  return response
}
