import { ModalType, Status, SwapType } from '../constants'
import { config } from '../../../../../constants/config'
import { EarnState } from '../../../../screens/EarnScreen/earnReducer/types'

export const manageInitialState = (earnState: EarnState) => {
	const { selectedVault, address } = earnState

	return {
		from: {
			amount: '',
			amount_usd: '',
			token: {
				name: 'Ethereum',
				symbol: 'ETH',
				logoURI: 'https://static.debank.com/image/token/logo_url/eth/935ae4e4d1d12d59a99717a24f2540b5.png',
				address: config.NULL_ADDRESS,
				decimals: 18,
				coinGeckoId: 'ethereum',
			},
			chain: {
				name: 'Ethereum',
				symbol: 'ETH',
				logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/ethereum.svg',
				id: 1,
				providers: [
					{
						name: 'lifi',
						symbol: 'ETH',
					},
					{
						name: 'rango',
						symbol: 'ETH',
					},
				],
			},
		},
		to: {
			amount: '',
			amount_usd: '',
			token: {
				name: selectedVault.data.vault_token.name,
				symbol: selectedVault.data.vault_token.symbol,
				logoURI: selectedVault?.project.logoURI,
				address: selectedVault.data.vault_token.address,
				decimals: selectedVault.data.vault_token.decimals,
			},
			chain: {
				name: selectedVault.chain.name,
				symbol: selectedVault.chain.symbol,
				logoURI: selectedVault.chain.logoURI,
				id: selectedVault.chain.id,
			},
		},
		address,
		snake: false,
		modalType: ModalType.input,
		swapType: SwapType.stake,
		route: null,
		isLoading: false,
		status: Status.input,
		balance: null,
		steps: [],
	}
}
