import { fetchTokenBalance } from '../../../../api/rango/fetchTokenBalance'
import { addingTokenDecimals } from '../../../../utils/formatting'

interface HandleBalanceProps {
  swapDispatch: any
  from: {
    chain: {
      id: string
      provider_symbols: {
        provider: string
        symbol: string
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

const handleError = (swapDispatch) => swapDispatch({ type: 'SET_BALANCE', payload: null })

export const handleBalance = async ({ swapDispatch, from, address }: HandleBalanceProps) => {
  if (!from || !address) return handleError(swapDispatch)

  const rangoChainSymbol = from.chain.provider_symbols.find((item) => item.provider === 'rango')?.symbol
  if (!rangoChainSymbol) return handleError(swapDispatch)

  const response = await fetchTokenBalance(rangoChainSymbol, from.token.address, address, from.token.symbol)
  if (response.status !== 200) return handleError(swapDispatch)

  const result = `${addingTokenDecimals(Number(response.data), from.token.decimals)} ${from.token.symbol}`
  swapDispatch({ type: 'SET_BALANCE', payload: result })
}
