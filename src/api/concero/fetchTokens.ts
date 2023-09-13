import { get } from '../client'

export const fetchTokens = async ({ chainId, offset, limit, search }) => {
  const url = `${process.env.CONCERO_API_URL}/tokens/?chain_id=${chainId}&offset=${offset}&limit=${limit}${search ? `&symbol=${search}` : ''}`
  const response = await get(url)
  if (response.status !== 200) throw new Error(response.statusText)
  return response.data.data
}
