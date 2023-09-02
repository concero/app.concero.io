import { chains } from '../../../../constants/chains'
import { tokens } from '../../../../constants/tokens'
import { State } from '../types'

export const swapInitialState: State = {
  from: {
    chain: {
      name: chains[0].name,
      symbol: chains[0].symbol,
      id: chains[0].id,
      logoURI: chains[0].logoURI,
      providers: {
        ...(chains[0].providers.lifi && {
          lifi: { key: chains[0].providers.lifi.key },
        }),
        ...(chains[0].providers.rango && {
          rango: { key: chains[0].providers.rango.key },
        }),
      },
    },
    token: {
      name: tokens[chains[0].id][0].name,
      symbol: tokens[chains[0].id][0].symbol,
      address: tokens[chains[0].id][0].address,
      decimals: tokens[chains[0].id][0].decimals,
      logoURI: tokens[chains[0].id][0].logoURI,
    },
    amount: '',
    amount_usd: 0.0,
    address: '',
  },
  to: {
    chain: {
      name: chains[1].name,
      symbol: chains[1].symbol,
      id: chains[1].id,
      logoURI: chains[1].logoURI,
      providers: {
        ...(chains[1].providers.lifi && {
          lifi: { key: chains[1].providers.lifi.key },
        }),
        ...(chains[1].providers.rango && {
          rango: { key: chains[1].providers.rango.key },
        }),
      },
    },
    token: {
      name: tokens[chains[1].id][0].name,
      symbol: tokens[chains[1].id][0].symbol,
      address: tokens[chains[1].id][0].address,
      decimals: tokens[chains[1].id][0].decimals,
      logoURI: tokens[chains[1].id][0].logoURI,
    },
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
}
