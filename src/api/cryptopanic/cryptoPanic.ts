import { get } from '../clientProxy'
import { authToken, crypoPanicAxiosConfig } from './config'

export const getPosts = async ({ currencies, filter }: { currencies: string[]; filter: string }) => {
  const currencyParam = currencies.join(',')
  console.log('sending request to cryptopanic', crypoPanicAxiosConfig)
  const url = `https://cryptopanic.com/api/v1/posts/?auth_token=${authToken}&currencies=${currencyParam}&filter=${filter}`

  const response = await get(url, crypoPanicAxiosConfig)
  console.log(response)
  return response
}