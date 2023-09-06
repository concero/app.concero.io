import { fetchRangoRoutes } from '../../../../api/rango/fetchRangoRoutes'
import { fetchLifiRoutes } from '../../../../api/lifi/fetchLifiRoutes'

const populateRoutes = ({ routes, from, swapDispatch }) => {
  swapDispatch({
    type: 'POPULATE_ROUTES',
    payload: routes,
    fromAmount: from.amount,
  })
}

const getLifiRoutes = async ({ routes, from, to, settings, swapDispatch }) => {
  try {
    const lifiRoutes = await fetchLifiRoutes({ from, to, settings })
    routes.push(...lifiRoutes)
    populateRoutes({ routes, from, swapDispatch })
    return lifiRoutes // Return the lifiRoutes for Promise.all
  } catch (error) {
    console.log(error)
    // throw error // Re-throw the error to be caught by Promise.all
  }
}

const getRangoRoutes = async ({ routes, from, to, settings, swapDispatch }) => {
  try {
    const rangoRoutes = await fetchRangoRoutes({ from, to, settings })
    routes.push(...rangoRoutes)
    populateRoutes({ routes, from, swapDispatch })
    return rangoRoutes // Return the rangoRoutes for Promise.all
  } catch (error) {
    console.log(error)
    // throw error // Re-throw the error to be caught by Promise.all
  }
}

export const getRoutes = async (from, to, settings, swapDispatch) => {
  if (!from.amount) return
  swapDispatch({ type: 'SET_LOADING', payload: true })

  const routes = []

  try {
    const [lifiRoutes, rangoRoutes] = await Promise.all([
      getLifiRoutes({ routes, from, to, settings, swapDispatch }),
      getRangoRoutes({ routes, from, to, settings, swapDispatch }),
    ])
    // swapDispatch({ type: 'SET_LOADING', payload: false })

    if (routes.length === 0) {
      swapDispatch({
        type: 'SET_RESPONSE',
        payload: {
          isOk: false,
          message: 'No routes found',
        },
      })
    }
    // Handle the fulfilled promises here if needed
    // lifiRoutes and rangoRoutes contain the resolved values
  } catch (error) {
    console.log(error)
  } finally {
    swapDispatch({ type: 'SET_LOADING', payload: false })
  }
}
