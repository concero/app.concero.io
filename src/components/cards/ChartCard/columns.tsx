import { CryptoSymbol } from '../../tags/CryptoSymbol/CryptoSymbol'
import { colors } from '../../../constants/colors'
import { truncate } from '../../../utils/formatting'

export const columns = [
	{
		columnTitle: 'Symbol',
		cellComponent: (token: { name: string; symbol: string; logoURI: string }) => (
			<CryptoSymbol src={token.logoURI} symbol={truncate(token.symbol, 7)} />
		),
	},
	{
		columnTitle: 'Name',
		cellComponent: (token: { name: string; symbol: string }) => (
			<p style={{ color: colors.grey.medium }}>{token.name ? truncate(token.name, 20) : ''}</p>
		),
	},
]
