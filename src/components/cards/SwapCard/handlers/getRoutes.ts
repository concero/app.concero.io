import { fetchRangoRoutes } from '../../../../api/rango/fetchRangoRoutes'
import { fetchLifiRoutes } from '../../../../api/lifi/fetchLifiRoutes'

const populateRoutes = ({ routes, from, swapDispatch }) => {
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
    type: 'POPULATE_ROUTES',
    payload: routes,
    fromAmount: from.amount,
  })

  swapDispatch({
    type: 'SET_LOADING',
    payload: false,
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
