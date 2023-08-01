export const clearRoutes = (typingTimeoutRef, swapDispatch) => {
  if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
  swapDispatch({ type: 'CLEAR_ROUTES' })
  swapDispatch({
    type: 'RESET_AMOUNTS',
    direction: 'to',
  })
}
