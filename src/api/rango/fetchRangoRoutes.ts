import { RangoClient } from 'rango-sdk-basic'

const rangoClient = new RangoClient(process.env.RANGO_API_KEY)

export const fetchRangoRoutes = async () => {
  console.log('fetching routes')
}
