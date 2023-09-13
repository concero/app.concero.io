import { get } from '../client'

// TODO add other props to the fetchChains function
export const fetchChains = async ({ chainId = null, search = null }) => {
  const url = `${process.env.CONCERO_API_URL}/chains${chainId ? `?id=${chainId}` : ''}${search ? `?search=${search}` : ''}`
  const response = await get(url)
  if (response.status !== 200) throw new Error('no chains found')
  return response.data.data
}
