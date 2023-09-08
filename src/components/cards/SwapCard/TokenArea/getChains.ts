import { fetchChains } from '../../../../api/concero/fetchChains'

export const getChains = async (tokenAreaDispatch) => {
  try {
    const response = await fetchChains()
    tokenAreaDispatch({ type: 'SET_CHAINS', payload: response })
  } catch (error) {
    console.log('error', error)
  }
}
