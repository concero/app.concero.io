import { InitialState } from './types'

export const initialState: InitialState = {
  vaults: [
    {
      id: '',
      name: '',
      type: '',
      protocol: {
        name: '',
        id: '',
      },
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
      tags: [],
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

  protocol: {
    id: '',
    name: '',
    description: '',
    logo_url: '',
    tvl_usd: '',
  },
}
