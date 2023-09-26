import { fetchCurrentTokenPriceUSD } from '../../../../../api/coinGecko/fetchCurrentTokenPriceUSD'
import { Dispatch } from 'react'
import { ManageAction } from '../useManageReducer/types'

export async function getCurrentPriceToken(selection, dispatch: Dispatch<ManageAction>) {
  try {
    const response = await fetchCurrentTokenPriceUSD(selection.token.coinGeckoId)
    dispatch({ type: 'SET_TOKEN_USD_PRICE', payload: response, direction: 'from' })
  } catch (error) {
    console.log('ERROR: ', error)
    dispatch({ type: 'SET_TOKEN_USD_PRICE', payload: null, direction: 'from' })
  }
}
