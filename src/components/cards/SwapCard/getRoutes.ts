import { fetchLifiRoutes } from '../../../api/lifi/fetchLifiRoutes'

export const getRoutes = async (from, to, swapDispatch, setPrevFromAmount, setResponse) => {
  if (!from.amount) return
  swapDispatch({
    type: 'SET_LOADING',
    payload: true,
  })
  const routes = []
  const lifiRoutes = await fetchLifiRoutes({ from, to })
  routes.push(...lifiRoutes)
  console.log('lifidata', lifiRoutes)
  console.log('routes', routes)
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
