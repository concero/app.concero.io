import { fetchRoutes } from '../../../api/lifi/fetchRoutes'

export const getRoutes = async (from, to, swapDispatch, setPrevFromAmount, setResponse) => {
  if (!from.amount) return
  swapDispatch({
    type: 'SET_LOADING',
    payload: true,
  })
  const data = await fetchRoutes({
    from,
    to,
  })
  swapDispatch({
    type: 'SET_LOADING',
    payload: false,
  })

  if (data.routes.length <= 0) {
    swapDispatch({
      type: 'SET_RESPONSES',
      payload: {
        provider: 'lifi',
        isOk: false,
        message: 'No Routes found',
      },
    })
  }
  setPrevFromAmount(from.amount)
  setResponse(data)
}
