import { RangoClient } from 'rango-sdk'

export const rangoClient = new RangoClient(process.env.RANGO_API_KEY)
