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
  } else {
    swapDispatch({
      type: 'POPULATE_ROUTES',
      payload: routes,
      fromAmount: from.amount,
    })
  }
}

const handleFetchLifiRoutes = async ({ routes, from, to, settings, swapDispatch }) => {
  try {
    const lifiRoutes = await fetchLifiRoutes({ from, to, settings })
    console.log('lifiRoutes', lifiRoutes)
    routes.push(...lifiRoutes)
    populateRoutes({ routes, from, swapDispatch })
  } catch (error) {
    console.log(error)
  }
}

const handleFetchRangoRoutes = async ({ routes, from, to, settings, swapDispatch }) => {
  try {
    const rangoRoutes = await fetchRangoRoutes({ from, to, settings })
    console.log('rangoRoutes', rangoRoutes)
    routes.push(...rangoRoutes)
    populateRoutes({ routes, from, swapDispatch })
  } catch (error) {
    console.log(error)
  }
}

export const getRoutes = async (from, to, settings, swapDispatch) => {
  if (!from.amount) return

  swapDispatch({
    type: 'SET_LOADING',
    payload: true,
  })

  const routes = []

  await Promise.all([
    handleFetchLifiRoutes({ routes, from, to, settings, swapDispatch }),
    handleFetchRangoRoutes({ routes, from, to, settings, swapDispatch }),
  ])

  if (routes.length === 0) {
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
