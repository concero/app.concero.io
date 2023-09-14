import { StakingState } from './types'

export const initialState: StakingState = {
  filter: {
    search: '',
    all: true,
    my_holdings: false,
    compound: false,
    chains: [],
    apy: '',
  },
  vaults: [],
  selectedVault: null,
  chains: [],
  userBalances: [],
}
