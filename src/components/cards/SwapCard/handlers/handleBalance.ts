import { fetchTokenBalance } from '../../../../api/rango/fetchTokenBalance'
import { addingTokenDecimals } from '../../../../utils/formatting'

interface HandleBalanceProps {
  swapDispatch: any
  from: {
    chain: {
      providers: {
        rango: {
          key: string
        }
      }
    }
    token: {
      address: string
      symbol: string
      decimals: number
    }
  }
  address: string
}

export const handleBalance = async ({ swapDispatch, from, address }: HandleBalanceProps) => {
  if (!address) return swapDispatch({ type: 'SET_BALANCE', payload: null })
  const response = await fetchTokenBalance(from.chain.providers.rango.key, from.token.address, address, from.token.symbol)
  const result = response?.data ? `${addingTokenDecimals(Number(response.data), from.token.decimals)} ${from.token.symbol}` : null
  swapDispatch({ type: 'SET_BALANCE', payload: result })
}
