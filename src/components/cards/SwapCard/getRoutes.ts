import { fetchLifiRoutes } from '../../../api/lifi/fetchLifiRoutes'
import { fetchRangoRoutes } from '../../../api/rango/fetchRangoRoutes'

export const getRoutes = async (from, to, swapDispatch, setPrevFromAmount, setResponse) => {
  if (!from.amount) return
  swapDispatch({
    type: 'SET_LOADING',
    payload: true,
  })
  const routes = []
  const rangoRoute = await fetchRangoRoutes({
    from,
    to,
  })
  const lifiRoutes = await fetchLifiRoutes({
    from,
    to,
  })
  console.log('RANGO routes', rangoRoute)

  routes.push(...lifiRoutes, ...[rangoRoute])

  console.log('ROUTES', routes)

  swapDispatch({
    type: 'SET_LOADING',
    payload: false,
  })

  if (routes.length <= 0) {
    swapDispatch({
      type: 'SET_RESPONSES',
      payload: {
        isOk: false,
        message: 'No routes found',
      },
    })
  }
  setPrevFromAmount(from.amount)
  setResponse(routes)
}
// different providers
