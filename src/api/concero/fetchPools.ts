import { post } from '../client'

export const fetchPools = async () => {
  const url = `${process.env.CONCERO_API_URL}/pools`
  const response = await post(url)
  if (response.status !== 200) throw new Error('no pools found')
  return response.data.data
}
