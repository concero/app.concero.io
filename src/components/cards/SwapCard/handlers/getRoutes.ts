import { fetchLifiRoutes } from '../../../../api/lifi/fetchLifiRoutes'

export const getRoutes = async (from, to, swapDispatch, setPrevFromAmount, setResponse) => {
  if (!from.amount) return
  swapDispatch({
    type: 'SET_LOADING',
    payload: true,
  })

  const routes = []
  // const rangoRoutePromise = fetchRangoRoutes({
  //   from,
  //   to,
  // })
  const lifiRoutePromise = fetchLifiRoutes({
    from,
    to,
  })
  const [lifiRoutes] = await Promise.all([lifiRoutePromise])
  routes.push(...lifiRoutes)

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
