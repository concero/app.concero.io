import { getRoutes } from './getRoutes'

export const handleFetchRoutes = async (from, to, swapDispatch, setPrevFromAmount, setResponse, typingTimeoutRef) => {
  try {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    const typingTimeoutId = setTimeout(() => getRoutes(from, to, swapDispatch, setPrevFromAmount, setResponse), 700)
    typingTimeoutRef.current = typingTimeoutId
  } catch (e) {
    console.error(e)
    swapDispatch({
      type: 'SET_LOADING',
      payload: false,
    })
  }
}