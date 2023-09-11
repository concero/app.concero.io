import { State } from '../types'

export const swapInitialState: State = (selection) => {
  return {
    from: {
      chain: selection.swapCard.from.chain,
      token: selection.swapCard.from.token,
      amount: '',
      amount_usd: 0.0,
      address: '',
    },
    to: {
      chain: selection.swapCard.to.chain,
      token: selection.swapCard.to.token,
      amount: '',
      amount_usd: 0.0,
      address: '',
    },
    balance: null,
    routes: [],
    isLoading: false,
    selectedRoute: null,
    typingTimeout: 0,
    response: null,
    stage: 'input', // input, progress
    steps: [], // [ { status, title, body, txLink } ]
    status: 'pending', // success, failure, pending, awaiting
    settings: {
      slippage_percent: '5',
      showDestinationAddress: false,
    },
    chains: [],
  }
}
