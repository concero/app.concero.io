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
  setPrevFromAmount(from.amount)
  if (!data || data.routes.length === 0) return
  setResponse(data)
}
