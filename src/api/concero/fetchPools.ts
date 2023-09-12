import { get } from '../client'

export const fetchPools = async () => {
  const url = `${process.env.CONCERO_API_URL}/pools?offset=0&limit=10`
  const response = await get(url)
  if (response.status !== 200) throw new Error(response.error)
  return response.data.data
}
