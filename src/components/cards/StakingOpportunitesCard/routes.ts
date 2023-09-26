export const routes = [
	{
		id: '1',
		interest_rate: '5.5%',
		insured: false,
		execution_duration_sec: '61',
		dex: {
			name: 'uniswap',
			logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/exchanges/oneinch.png',
		},
		from: {
			chain: {
				id: '1',
				name: 'Ethereum',
			},
			token: {
				symbol: 'ETH',
				address: '0x0000000',
			},
		},
		to: {
			chain: {
				id: '1',
				name: 'Ethereum',
			},
			token: {
				symbol: 'MATIC',
				address: '0x0000000',
			},
		},
	},
	{
		id: '2',
		interest_rate: '9.3%',
		insured: true,
		execution_duration_sec: '61',
		dex: {
			name: 'uniswap',
			logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/exchanges/oneinch.png',
		},
		from: {
			chain: {
				id: '1',
				name: 'Ethereum',
			},
			token: {
				symbol: 'ETH',
				address: '0x0000000',
			},
		},
		to: {
			chain: {
				id: '1',
				name: 'Ethereum',
			},
			token: {
				symbol: 'USDT',
				address: '0x0000000',
			},
		},
	},
	{
		id: '3',
		interest_rate: '2.5%',
		insured: true,
		execution_duration_sec: '61',
		dex: {
			name: 'uniswap',
			logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/exchanges/oneinch.png',
		},
		from: {
			chain: {
				id: '1',
				name: 'Ethereum',
			},
			token: {
				symbol: 'ETH',
				address: '0x0000000',
			},
		},
		to: {
			chain: {
				id: '1',
				name: 'Ethereum',
			},
			token: {
				symbol: 'DAI',
				address: '0x0000000',
			},
		},
	},
]
