import { Dispatch } from 'react'
import { fetchTokenBalance } from '../api/rango/fetchTokenBalance'
import { addingTokenDecimals } from './formatting'

interface HandleBalanceProps {
  dispatch: Dispatch<any>
  from: {
    chain: {
      id: string
      providers: {
        name: string
        symbol: string
      }[]
    }
    token: {
      address: string
      symbol: string
      decimals: number
    }
  }
  address: string | null
}

const handleError = (dispatch) => dispatch({ type: 'SET_BALANCE', payload: null })

export async function getBalance({ dispatch, from, address }: HandleBalanceProps) {
  if (!from || !address) return handleError(dispatch)

  const rangoChainSymbol = from.chain?.providers?.find((item) => item.name === 'rango')?.symbol
  if (!rangoChainSymbol) return handleError(dispatch)

  const response = await fetchTokenBalance(rangoChainSymbol, from.token.address, address, from.token.symbol)
  if (response.status !== 200) return handleError(dispatch)

  const result = `${addingTokenDecimals(Number(response.data), from.token.decimals)} ${from.token.symbol}`
  dispatch({ type: 'SET_BALANCE', payload: result })
}
