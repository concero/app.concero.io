import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { GlobalEventsDispatcher } from '../lib/store/globalState'

const client = axios.create({
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
	withCredentials: true,
})
client.interceptors.response.use(
	response => response,
	error => {
		if (error.response?.status === 401) {
			GlobalEventsDispatcher.showTermsModal()
		}
		return Promise.reject(error)
	},
)

const request = async <TResponse>(options: AxiosRequestConfig): Promise<TResponse> => {
	try {
		const response: AxiosResponse<TResponse> = await client(options)
		return response.data
	} catch (error: any) {
		const response = error?.response
		if (response) throw response.data || response
		throw error
	}
}
export const get = <TResponse>(
	url: string,
	params?: AxiosRequestConfig['params'],
	headers?: AxiosRequestConfig['headers'],
) =>
	request<TResponse>({
		url,
		method: 'GET',
		params,
		headers,
	})

export const post = <TResponse, TData = unknown>(url: string, data?: TData, headers?: AxiosRequestConfig['headers']) =>
	request<TResponse>({
		url,
		method: 'POST',
		data,
		headers,
	})

export const del = <TResponse, TData = unknown>(url: string, data?: TData, headers?: AxiosRequestConfig['headers']) =>
	request<TResponse>({
		url,
		method: 'DELETE',
		data,
		headers,
	})
export const patch = <TResponse, TData = unknown>(url: string, data?: TData, headers?: AxiosRequestConfig['headers']) =>
	request<TResponse>({
		url,
		method: 'PATCH',
		data,
		headers,
	})
export const put = <TResponse, TData = unknown>(url: string, data?: TData, headers?: AxiosRequestConfig['headers']) =>
	request<TResponse>({
		url,
		method: 'PUT',
		data,
		headers,
	})
