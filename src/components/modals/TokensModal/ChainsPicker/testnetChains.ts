export const testnetChains = [
	{
		addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
		explorerURI: 'https://sepolia.arbiscan.io',
		id: '421614',
		logoURI: 'https://api.concero.io/static/icons/chains/42161.svg',
		name: 'Arbitrum sepolia',
		providers: [
			{
				name: 'lifi',
				symbol: 'ETH',
				_id: { $oid: '6624736cc8d3de82d2749215' },
			},
		],
		symbol: 'ETH',
		tokens: [],
	},
	{
		addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
		explorerURI: 'https://sepolia-optimism.etherscan.io',
		id: '11155420',
		logoURI: 'https://api.concero.io/static/icons/chains/10.svg',
		name: 'Optimism sepolia',
		providers: [
			{
				name: 'lifi',
				symbol: 'ETH',
				_id: { $oid: '6624736cc8d3de82d2749216' },
			},
		],
		symbol: 'ETH',
		tokens: [],
	},
	{
		addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
		explorerURI: 'https://basescan.org',
		id: '84532',
		logoURI: 'https://api.concero.io/static/icons/chains/8453.svg',
		name: 'BASE sepolia',
		providers: [
			{
				name: 'lifi',
				symbol: 'ETH',
				_id: { $oid: '6624736cc8d3de82d274921b' },
			},
		],
		symbol: 'ETH',
		tokens: [],
	},
]
