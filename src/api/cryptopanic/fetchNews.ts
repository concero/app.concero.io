import { authToken, baseURL } from './config'
import { get } from '../clientProxy'

export async function fetchNews(currencies, page, filter = '') {
	const currencyParam = currencies.join(',')
	const url = `${baseURL}/posts/?auth_token=${authToken}&currencies=${currencyParam}&filter=${filter}&page=${page}`
	return await get({ url })
}
