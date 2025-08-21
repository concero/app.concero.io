import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

export const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
	withCredentials: true,
})

apiClient.interceptors.request.use(
	config => {
		const token = localStorage.getItem('accessToken')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => Promise.reject(error),
)

// const http = {
// 	get: <T>(url: string, config?: Parameters<typeof apiClient.get>[1]) =>
// 		apiClient.get<T, AxiosResponse<T>>(url, config).then(res => res.data),

// 	post: <T, B>(url: string, body: B, config?: Parameters<typeof apiClient.post>[2]) =>
// 		apiClient.post<T, AxiosResponse<T>, B>(url, body, config as any).then(res => res.data),

// 	put: <T, B>(url: string, body: B, config?: Parameters<typeof apiClient.put>[2]) =>
// 		apiClient.put<T, AxiosResponse<T>, B>(url, body, config as any).then(res => res.data),

// 	patch: <T, B>(url: string, body: B, config?: Parameters<typeof apiClient.patch>[2]) =>
// 		apiClient.patch<T, AxiosResponse<T>, B>(url, body, config as any).then(res => res.data),

// 	delete: <T>(url: string, config?: Parameters<typeof apiClient.delete>[1]) =>
// 		apiClient.delete<T, AxiosResponse<T>>(url, config).then(res => res.data),
// }

const request = async <TResponse extends unknown>(options: AxiosRequestConfig) => {
	try {
		const response: AxiosResponse<TResponse, unknown> = await apiClient(options)
		return response
	} catch (error) {
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
		method: 'DELETE',
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
