import { ManageState } from './useManageReducer/types'
import { Dispatch } from 'react'
import { fetchQuote } from '../../../../api/wido/fetchQuote'

export async function getQuote(manageState: ManageState, manageDispatch: Dispatch<any>) {
  try {
    const response = await fetchQuote(manageState)
    console.log('response: ', response)
    manageDispatch({ type: 'SET_ROUTE', payload: response })
  } catch (error) {
    console.error('[getQuote] ', error)
  }
}
