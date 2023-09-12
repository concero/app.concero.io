import { get } from '../client'

export const fetchStakingChartData = async (poolId: string) => {
  const response = await get(`https://yields.llama.fi/chart/${poolId}`)

  if (response.status !== 200) throw new Error('Error fetching data')
  return response
}
