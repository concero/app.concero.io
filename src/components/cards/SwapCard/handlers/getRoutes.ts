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

const handleFetchLifiRoutes = async ({ routes, from, to, swapDispatch }) => {
  try {
    const lifiRoutes = await fetchLifiRoutes({ from, to })
    routes.push(...lifiRoutes)
    populateRoutes({ routes, from, swapDispatch })
  } catch (error) {
    console.log(error)
  }
}

const handleFetchRangoRoutes = async ({ routes, from, to, swapDispatch }) => {
  try {
    const rangoRoutes = await fetchRangoRoutes({ from, to })
    routes.push(...rangoRoutes)
    populateRoutes({ routes, from, swapDispatch })
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

  await Promise.all([
    handleFetchLifiRoutes({ routes, from, to, swapDispatch }),
    handleFetchRangoRoutes({ routes, from, to, swapDispatch }),
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
