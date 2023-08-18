import { fetchLifiRoutes } from '../../../../api/lifi/fetchLifiRoutes'
import { fetchRangoRoutes } from '../../../../api/rango/fetchRangoRoutes'

export const getRoutes = async (from, to, swapDispatch) => {
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

  const [lifiRoutes, rangoRoute] = await Promise.all([lifiRoutePromise, rangoRoutePromise])
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

  swapDispatch({ type: 'POPULATE_ROUTES', payload: routes, fromAmount: from.amount })
}
