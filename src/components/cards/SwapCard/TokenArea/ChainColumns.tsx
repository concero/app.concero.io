import { CryptoSymbol } from '../../../tags/CryptoSymbol/CryptoSymbol'

export const ChainColumns = [
	{
		columnTitle: 'Symbol',
		cellComponent: (chain: { name: string; symbol: string }) => (
			<CryptoSymbol src={chain.logoURI} symbol={chain.coin} />
		),
	},
	{
		columnTitle: 'Name',
		cellComponent: (chain: { name: string; symbol: string }) => (
			<p style={{ color: 'var(--color-grey-500' }}>{chain.name}</p>
		),
	},
]
