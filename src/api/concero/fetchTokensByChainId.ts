import { get } from '../client'

export const fetchTokensByChainId = async ({ chainId, offset, limit }) => {
  const url = `${process.env.CONCERO_API_URL}/tokens/?chain_id=${chainId}&offset=${offset}&limit=${limit}`
  const response = await get(url)
  if (response.status !== 200) throw new Error(response.statusText)
  return response.data.data
}
