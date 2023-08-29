import axios, { AxiosRequestConfig } from 'axios'

const client = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

const request = async (options: AxiosRequestConfig): Promise<any> => {
  try {
    return await client(options)
  } catch (error) {
    console.error('Error', error.response)
    throw error
  }
}

export const get = async (url: string, params?: any, headers?: any): Promise<any> =>
  request({
    url,
    method: 'GET',
    params,
    headers,
  })

export const post = async (url: string, data: any, headers?: any): Promise<any> =>
  request({
    url,
    method: 'POST',
    data,
    headers,
  })
