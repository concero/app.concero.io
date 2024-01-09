import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

const client = axios.create({
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
})

const request = async (options: AxiosRequestConfig): Promise<any> => {
	try {
		const response: AxiosResponse = await client(options)
		return response
	} catch (error) {
		console.error('Error', error.response)
		throw error.response
	}
}

export const get = async (url: string, params?: any, headers?: any): Promise<any> =>
	await request({
		url,
		method: 'GET',
		params,
		headers,
	})

export const post = async (url: string, data: any, headers?: any): Promise<any> =>
	await request({
		url,
		method: 'POST',
		data,
		headers,
	})
