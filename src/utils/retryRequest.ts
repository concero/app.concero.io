interface Options {
	retryCount?: number
	throwCondition?: (e: any) => boolean
}

export async function retryRequest(request: (i: number) => Promise<any>, options: Options): Promise<any> {
	const { retryCount = 3, throwCondition = () => false } = options
	let error = 'Unknown error'

	for (let i = 0; i < retryCount; i++) {
		try {
			const response = await request(i)
			if (response) return response
		} catch (e: any) {
			console.error(e)
			if (throwCondition(e)) throw e
			error = e
		}
	}

	throw new Error(error)
}
