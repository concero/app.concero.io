import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { config } from '../constants/config'
import queue from './queue.ts'

type GetParams = Record<string, any>

type PostData = Record<string, any>

const api = axios.create({
	baseURL: config.baseURL,
	headers: config.headers,
})

// Axios interceptor for adding authorization token to request headers.
api.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		const token = localStorage.getItem('token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	async error => await Promise.reject(error),
)

export async function get({ url, headers }): Promise<any> {
	try {
		const request = {
			method: 'post',
			url: `${config.baseURL}/proxy`,
			headers: config.headers,
			data: {
				url,
				method: 'GET',
				headers: headers || {},
			},
		}
		const response: AxiosResponse = await queue.add(request)
		return response
	} catch (error) {
		console.error('GET request failed:', error)
		throw error
	}
}

/**
 * Performs a POST request to the specified URL with the given data.
 * @param {string} url - The URL to send the POST request to.
 * @param {PostData} data - The data to send with the POST request.
 * @returns {Promise<any>} A promise that resolves with the response data if the request succeeds, or rejects with an error if it fails.
 */
export async function post({ url, headers, body }): Promise<any> {
	try {
		const response: AxiosResponse = await queue.add({
			method: 'post',
			url: `${config.baseURL}/proxy`,
			headers: config.headers,
			data: {
				url,
				method: 'POST',
				headers: headers || {},
				body,
			},
		})
		return response
	} catch (error) {
		console.error('POST proxy request failed:', error)
		throw error
	}
}

export default { get, post }
