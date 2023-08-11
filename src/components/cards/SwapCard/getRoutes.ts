import { fetchLifiRoutes } from '../../../api/lifi/fetchLifiRoutes'
import { fetchRangoRoutes } from '../../../api/rango/fetchRangoRoutes'

export const getRoutes = async (from, to, swapDispatch, setPrevFromAmount, setResponse) => {
  if (!from.amount) return
  swapDispatch({
    type: 'SET_LOADING',
    payload: true,
  })

  const routes = []

  const rangoRoutePromise = fetchRangoRoutes({
    from,
    to,
  })
  const lifiRoutePromise = fetchLifiRoutes({
    from,
    to,
  })
  const [rangoRoute, lifiRoutes] = await Promise.all([rangoRoutePromise, lifiRoutePromise])
  routes.push(...[rangoRoute], ...lifiRoutes)

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
