import { get } from '../client'

export const fetchChains = async () => {
  const response = await get('http://localhost:4000/api/chains')
  if (response.status !== 200) throw new Error(response.message)
  return response.data.data
}
