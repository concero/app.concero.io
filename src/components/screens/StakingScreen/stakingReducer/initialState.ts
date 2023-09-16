import { StakingState } from './types'

export const initialState: StakingState = {
  filter: {
    search: '',
    all: true,
    my_holdings: false,
    compound: false,
    chains: [],
    apy: '',
    category: [],
  },
  vaults: [],
  selectedVault: null,
  chains: [],
  address: null,
}
