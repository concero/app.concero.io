export async function retryRequest(request: () => Promise<any>, condition: Function, retryCount = 3): Promise<any> {
	let error = 'Unknown error'

	for (let i = 0; i < retryCount; i++) {
		try {
			const response = await request()
			if (response) return response
		} catch (e: any) {
			console.log(e)
			if (condition(e)) throw e
			error = e
		}
	}

	throw new Error(error)
}
