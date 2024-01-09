import { type EarnState } from './types'

export const initialState: EarnState = {
	filter: {
		search: '',
		all: true,
		my_holdings: false,
		chains: [],
		apy: '',
		category: [],
	},
	vaults: [],
	selectedVault: null,
	chains: [],
	address: null,
	loading: false,
	balances: {},
}
