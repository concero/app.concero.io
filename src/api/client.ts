import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { config } from '../constants/config'

interface GetParams {
  [key: string]: any
}

interface PostData {
  [key: string]: any
}

const api = axios.create({
  baseURL: config.baseURL,
  headers: config.headers,
})

// Add a request interceptor to attach the authentication token if needed
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export async function get(url: string, params: GetParams = {}): Promise<any> {
  try {
    const response: AxiosResponse = await api.get(url, { params })
    return response.data
  } catch (error) {
    console.error('GET request failed:', error)
    throw error
  }
}

export async function post(url: string, data: PostData): Promise<any> {
  try {
    const response: AxiosResponse = await api.post(url, data)
    return response.data
  } catch (error) {
    console.error('POST request failed:', error)
    throw error
  }
}

export async function imageUpload(url: string, imageFile: File): Promise<any> {
  try {
    const formData = new FormData()
    formData.append('image', imageFile)

    const response: AxiosResponse = await api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  } catch (error) {
    console.error('Image upload failed:', error)
    throw error
  }
}
