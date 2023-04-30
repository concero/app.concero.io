import axios from 'axios'
import { config } from '../constants/config'

const api = axios.create({
  baseURL: config.baseURL,
  headers: config.headers,
})

// Add a request interceptor to attach the authentication token if needed
api.interceptors.request.use(
  (config) => {
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

export async function get(url, params = {}) {
  try {
    const response = await api.get(url, { params })
    return response.data
  } catch (error) {
    console.error('GET request failed:', error)
    throw error
  }
}

export async function post(url, data) {
  try {
    const response = await api.post(url, data)
    return response.data
  } catch (error) {
    console.error('POST request failed:', error)
    throw error
  }
}

export async function imageUpload(url, imageFile) {
  try {
    const formData = new FormData()
    formData.append('image', imageFile)

    const response = await api.post(url, formData, {
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
