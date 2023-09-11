import { InitialState } from './types'

const vaults = [
  {
    id: '1',
    name: '',
    symbol: 'B-60MKR-40WETH-stETH',
    type: '',
    protocol_id: 'uniswap',
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
    underlying_assets: [
      {
        chain_id: '1',
        name: 'Ethereum',
        symbol: 'WETH',
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        decimals: 18,
        logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880',
        apy: 0,
      },
      {
        chain_id: '1',
        name: 'Matic Token',
        symbol: 'MATIC',
        address: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
        decimals: 18,
        logo: 'https://assets.coingecko.com/coins/images/4713/small/matic___polygon.jpg?1612939050',
        apy: 0,
      },
    ],
    min_deposit: '',
    min_withdrawal: '',
    max_withdrawal: '',
    max_deposit: '',
  },
]

const protocols = {
  uniswap: {
    id: 'uniswap',
    name: 'Uniswap',
    description: 'Uniswap is a protocol for automated token exchange on Ethereum.',
    logo_url: 'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png?1600306604',
    tvl_usd: '1,000,000,000',
  },
}

export const initialState: InitialState = {
  filter: {
    search: '',
    all: true,
    my_holdings: false,
    types: ['staking', 'lp'],
    insurable: false,
    compound: false,
    sort: 'recommended',
    chains: [],
  },
  vaults,
  selectedVault: vaults[0],
  protocols,
  chains: [],
}
