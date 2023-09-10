export const populateTokens = async ({ getTokens, dispatch, selection }) => {
  const tokens = await getTokens(selection.swapCard.to.chain.id)
  dispatch({ type: 'SET_TOKENS', payload: tokens })
}
