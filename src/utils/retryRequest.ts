export async function retryRequest(request: () => Promise<any>, retryCount = 3): Promise<any> {
  let error = 'Unknown error'

  for (let i = 0; i < retryCount; i++) {
    try {
      const response = await request()
      if (response) return response
    } catch (e: any) {
      error = e
      console.log(e)
    }
  }

  throw new Error(error)
}
