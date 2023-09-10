import { fetchTokensByChainId } from '../../../../api/concero/fetchTokensByChainId'

export const getTokens = async (selection, tokenAreaDispatch) => {
  try {
    console.log('getTokens')
    const response = await fetchTokensByChainId(selection.chain.id)
    console.log(response)
    tokenAreaDispatch({ type: 'SET_TOKENS', payload: response })
  } catch (error) {
    console.log(error)
  }
}
