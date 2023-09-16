import { get } from '../client'

// TODO add other props to the fetchChains function
export const fetchChains = async ({ chainId = null, offset = 0, limit = 15, search = null }) => {
  // console.log('fetchChains', { chainId, offset, limit, search })
  const url = `${process.env.CONCERO_API_URL}/chains?offset=${offset}${limit ? `&limit=${limit}` : ''}${chainId ? `&chainId=${chainId}` : ''}${
    search ? `&search=${search}` : ''
  }`
  const response = await get(url)
  if (response.status !== 200) throw new Error('no chains found')
  return response.data.data
}
