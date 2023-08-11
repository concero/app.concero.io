import { RangoClient } from 'rango-sdk-basic'

export const rangoClient = new RangoClient(process.env.RANGO_API_KEY)
