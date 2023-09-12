import { get } from '../client'

export const fetchStakingChartData = async (poolId: string) => {
  console.log(`Fetching staking chart data for ${poolId}`)
  const response = await get(`https://yields.llama.fi/chart/${poolId}`)

  if (response.status !== 200) throw new Error('Error fetching data')
  return response
}
