import { fetchTokensByChainId } from '../../../../api/concero/fetchTokensByChainId'

export const getTokens = async (selection, tokenAreaDispatch) => {
  try {
    const response = await fetchTokensByChainId(selection.chain.id)
    tokenAreaDispatch({ type: 'SET_TOKENS', payload: response })
  } catch (error) {
    console.log(error)
  }
}
