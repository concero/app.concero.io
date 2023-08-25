import { InitialState } from './types'

export const initialState: InitialState = {
  filter: {
  search: '',
  types: ['staking', 'lp'],
  insurable: false,
   compound: false,
},
sort: 'recommended',
  vaults: [
    {
      id: '',
      name: '',
      type: '',
      protocol_id: '',
      total_apy: '',
      total_fees_usd: '',
      yields: [
        {
          chain_id: '',
          name: '',
          symbol: '',
          address: '',
          decimals: 0,
          logo: '',
          apy: 0,
        },
      ],
      fees: [
        {
          fee_bps: 0,
          fee_type: '',
          fee_description: '',
        },
      ],
      // tags: [],
      underlying_assets: [
        {
          chain_id: '',
          name: '',
          symbol: '',
          address: '',
          decimals: 0,
          logo: '',
          apy: 0,
        },
      ],
      min_deposit: '',
      min_withdrawal: '',
      max_withdrawal: '',
      max_deposit: '',
    },
  ],

  protocols: {
    'staking' : {
    id: '',
    name: '',
    description: '',
    logo_url: '',
    tvl_usd: '',
  },
}
