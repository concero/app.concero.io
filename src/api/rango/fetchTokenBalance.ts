import { get } from '../client'
import { tokenNullAddress } from '../../constants/tokenNullAddress'

export const fetchTokenBalance = async (blockchain: string, tokenAddress: string, walletAddress: string, tokenSymbol: string): Promise<string> => {
  const address = tokenAddress === tokenNullAddress ? '' : `&address=${tokenAddress}`
  const url = `https://api.rango.exchange/basic/token-balance?walletAddress=${walletAddress}&blockchain=${blockchain}&symbol=${tokenSymbol}${address}&apiKey=${process.env.RANGO_API_KEY}`
  return await get(url)
}
