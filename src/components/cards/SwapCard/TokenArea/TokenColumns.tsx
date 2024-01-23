import { CryptoSymbol } from '../../../tags/CryptoSymbol/CryptoSymbol'
import { truncate } from '../../../../utils/formatting'

export const TokenColumns = [
	{
		columnTitle: 'Symbol',
		cellComponent: (token: { name: string; symbol: string; logoURI: string }) => <CryptoSymbol src={token.logoURI} />,
	},
	{
		columnTitle: 'Name',
		cellComponent: (token: { name: string; symbol: string }) => (
			<p style={{ color: 'var(--color-grey-500' }}>{token.name !== null ? truncate(token.name, 20) : ''}</p>
		),
	},
]
