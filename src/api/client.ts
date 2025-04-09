import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

const client = axios.create({
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
	withCredentials: true,
})

const request = async <TResponse extends unknown>(options: AxiosRequestConfig) => {
	try {
		const response: AxiosResponse<TResponse, unknown> = await client(options)
		return response
	} catch (error) {
		console.error('Error', error.response)
		throw error.response
	}
}

export const get = async <TResponse extends unknown>(
	url: string,
	params?: AxiosRequestConfig['params'],
	headers?: AxiosRequestConfig['headers'],
) =>
	await request<TResponse>({
		url,
		method: 'GET',
		params,
		headers,
	})

export const post = async <TResponse extends unknown>(url: string, data?: any, headers?: any) =>
	await request<TResponse>({
		url,
		method: 'POST',
		data,
		headers,
	})

export const del = async <TResponse extends unknown>(url: string, data?: any, headers?: any) =>
	await request<TResponse>({
		url,
		method: 'POST',
		data,
		headers,
	})

export const patch = async <TResponse extends unknown = unknown>(url: string, data: any, headers?: any) =>
	await request<TResponse>({
		url,
		method: 'PATCH',
		data,
		headers,
	})
