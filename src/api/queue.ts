import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

interface Request {
	config: AxiosRequestConfig
	resolve: (value?: AxiosResponse | PromiseLike<AxiosResponse>) => void
	reject: (reason?: any) => void
	retries: number
}

const MAX_RETRIES = 0

class Queue {
	private readonly queue: Request[] = []

	async add(request: AxiosRequestConfig): Promise<AxiosResponse> {
		return await new Promise((resolve, reject) => {
			this.queue.push({
				config: request,
				resolve,
				reject,
				retries: 0,
			})
			this.processQueue()
		})
	}

	async processQueue() {
		if (this.queue.length === 0) return

		const { config, resolve, reject, retries } = this.queue.shift()!

		try {
			const response = await axios(config)
			resolve(response)
			this.processQueue()
		} catch (error) {
			if (retries < MAX_RETRIES) {
				// Retry the same request
				this.queue.unshift({
					config,
					resolve,
					reject,
					retries: retries + 1,
				})
				this.processQueue()
			} else {
				reject(error)
			}
		}
	}
}

const queue = new Queue()

export default queue
