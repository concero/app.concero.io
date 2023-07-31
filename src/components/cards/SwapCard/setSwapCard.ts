export const setSwapCard = (dispatch, from, to) => {
  dispatch({
    type: 'SET_SWAP_CARD',
    payload: {
      from: {
        chainId: from.chain.id,
        token: {
          symbol: from.token.symbol,
          address: from.token.address,
          logoURI: from.token.logoURI,
        },
      },
      to: {
        chainId: to.chain.id,
        token: {
          symbol: to.token.symbol,
          address: to.token.address,
          logoURI: to.token.logoURI,
        },
      },
    },
  })
}
