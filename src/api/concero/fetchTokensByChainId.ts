import { get } from '../client'

export const fetchTokensByChainId = async (chainId: string) => {
  const url = `${process.env.CONCERO_API_URL}/tokens/?chain_id=${chainId}`
  const response = await get(url)
  if (response.status !== 200) throw new Error(response.statusText)
  return response.data.data
}
