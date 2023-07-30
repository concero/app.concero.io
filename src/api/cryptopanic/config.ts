import { config } from '../../constants/config'

export const authToken = config.CRYPTOPANIC_API_KEY

export const headers = {
  Authorization: `Bearer ${authToken}`,
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  'Content-Type': 'application/json',
}
