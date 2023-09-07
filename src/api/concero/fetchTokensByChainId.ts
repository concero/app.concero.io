import { get } from '../client'

export const fetchTokensByChainId = async (chainId: string) => {
  const url = `http://localhost:4000/api/tokens/${chainId}`
  const response = await get(url)
  if (response.status !== 200) throw new Error(response.statusText)
  return response.data.data
}
