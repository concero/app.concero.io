import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { config } from '../constants/config'
import queue from './queue.ts'

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

// Axios interceptor for adding authorization token to request headers.
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

/**
 Performs a GET request to the specified URL with the given parameters.
 @param {string} url - The URL to send the GET request to.
 @param {GetParams} params - The parameters to send with the GET request.
 @returns {Promise<any>} A promise that resolves with the response data if the request succeeds, or rejects with an error if it fails.
 */
export async function get(url: string, params: GetParams = {}): Promise<any> {
  try {
    const response: AxiosResponse = await queue.add({
      method: 'get',
      url,
      headers: config.headers,
      params,
    })
    return response
  } catch (error) {
    console.error('GET request failed:', error)
    throw error
  }
}

/**
 Performs a POST request to the specified URL with the given data.
 @param {string} url - The URL to send the POST request to.
 @param {PostData} data - The data to send with the POST request.
 @returns {Promise<any>} A promise that resolves with the response data if the request succeeds, or rejects with an error if it fails.
 */
export async function post(url: string, data: PostData): Promise<any> {
  try {
    const response: AxiosResponse = await queue.add({
      method: 'post',
      url,
      headers: config.headers,
      data,
    })

    return response
  } catch (error) {
    console.error('POST request failed:', error)
    throw error
  }
}

/**
 Uploads an image file to the specified URL using a POST request.
 @param {string} url - The URL to send the POST request to.
 @param {File} imageFile - The image file to upload.
 @returns {Promise<any>} A promise that resolves with the response data if the request succeeds, or rejects with an error if it fails.
 */
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

export default { get, post }
