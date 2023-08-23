import { fetchRangoRoutes } from '../../../../api/rango/fetchRangoRoutes'
import { fetchLifiRoutes } from '../../../../api/lifi/fetchLifiRoutes'

const populateRoutes = ({ routes, from, swapDispatch }) => {
  swapDispatch({
    type: 'POPULATE_ROUTES',
    payload: routes,
    fromAmount: from.amount,
  })
}

const handleFetchLifiRoutes = async ({ routes, swapDispatch, from, to }) => {
  try {
    const lifiRoutes = await fetchLifiRoutes({
      from,
      to,
    })
    routes.push(...lifiRoutes)
    populateRoutes({
      routes,
      from,
      swapDispatch,
    })
  } catch (error) {
    console.log(error)
  }
}

const handleFetchRangoRoutes = async ({ routes, swapDispatch, from, to }) => {
  try {
    const rangoRoute = await fetchRangoRoutes({
      from,
      to,
    })
    routes.push(...rangoRoute)
    populateRoutes({
      routes,
      from,
      swapDispatch,
    })
  } catch (error) {
    console.log(error)
  }
}

export const getRoutes = async (from, to, swapDispatch) => {
  if (!from.amount) return

  swapDispatch({
    type: 'SET_LOADING',
    payload: true,
  })

  const routes = []
  let lifiRoutesFetched = false
  let rangoRoutesFetched = false

  const handleFetchLifi = handleFetchLifiRoutes({
    routes,
    swapDispatch,
    from,
    to,
  }).finally(() => {
    lifiRoutesFetched = true
    checkCompletion()
  })

  const handleFetchRango = handleFetchRangoRoutes({
    routes,
    swapDispatch,
    from,
    to,
  }).finally(() => {
    rangoRoutesFetched = true
    checkCompletion()
  })

  const checkCompletion = () => {
    if (!lifiRoutesFetched || !rangoRoutesFetched) return

    if (routes.length <= 0) {
      swapDispatch({
        type: 'SET_RESPONSES',
        payload: {
          isOk: false,
          message: 'No routes found',
        },
      })
    }

    swapDispatch({
      type: 'SET_LOADING',
      payload: false,
    })
  }
}
