import { get } from '../client'

export async function fetchProtocolDataById(protocolId: string) {
  const url = `http://localhost:4000/api/protocols?_id=${protocolId}&limit=15&offset=0`
  const response = await get(url)
  return response.data.data
}
