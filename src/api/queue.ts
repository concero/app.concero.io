import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import axiosRetry from 'axios-retry'

interface Request {
  config: AxiosRequestConfig
  resolve: (value?: AxiosResponse | PromiseLike<AxiosResponse>) => void
  reject: (reason?: any) => void
}

class Queue {
  private queue: Request[] = []

  async add(request: AxiosRequestConfig): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      this.queue.push({ config: request, resolve, reject })
      this.process()
    })
  }

  async process() {
    if (this.queue.length === 0) return

    const { config, resolve, reject } = this.queue.shift()!

    try {
      const response = await axios(config)
      resolve(response)
      this.process()
    } catch (error) {
      reject(error)
      // Retry the same request
      this.queue.unshift({ config, resolve, reject })
      this.process()
    }
  }
}

axiosRetry(axios, { retries: 3 })

const queue = new Queue()

export default queue
