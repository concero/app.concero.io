export const populateTokens = async ({ getTokens, selection, tokenAreaDispatch }: { getTokens: (id) => void; selection: any; tokenAreaDispatch: any }) => {
  const tokens = await getTokens(selection.chain.id.toString())
  tokenAreaDispatch({ type: 'SET_TOKENS', payload: tokens })
}
