import { fetchRangoRoutes } from '../../../../api/rango/fetchRangoRoutes'
import { fetchLifiRoutes } from '../../../../api/lifi/fetchLifiRoutes'

const populateRoutes = ({ routes, from, swapDispatch }) => {
  if (routes.length <= 0) {
    return swapDispatch({
      type: 'SET_RESPONSES',
      payload: {
        isOk: false,
        message: 'No routes found',
      },
    })
  }

  swapDispatch({
    type: 'POPULATE_ROUTES',
    payload: routes,
    fromAmount: from.amount,
  })
}

const handleFetchLifiRoutes = ({ routes, swapDispatch, from, to }) => {
  fetchLifiRoutes({
    from,
    to,
  })
    .then((lifiRoutes) => {
      routes.push(...lifiRoutes)
      populateRoutes({
        routes,
        from,
        swapDispatch,
      })
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      swapDispatch({
        type: 'SET_LOADING',
        payload: false,
      })
    })
}

const handleFetchRangoRoutes = ({ routes, swapDispatch, from, to }) => {
  fetchRangoRoutes({
    from,
    to,
  })
    .then((rangoRoute) => {
      routes.push(rangoRoute)
      populateRoutes({
        routes,
        from,
        swapDispatch,
      })
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      swapDispatch({
        type: 'SET_LOADING',
        payload: false,
      })
    })
}

export const getRoutes = async (from, to, swapDispatch) => {
  if (!from.amount) return

  swapDispatch({
    type: 'SET_LOADING',
    payload: true,
  })

  const routes = []

  handleFetchLifiRoutes({
    routes,
    swapDispatch,
    from,
    to,
  })

  handleFetchRangoRoutes({
    routes,
    swapDispatch,
    from,
    to,
  })
}
