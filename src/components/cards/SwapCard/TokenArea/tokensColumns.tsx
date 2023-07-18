import { CryptoSymbol } from '../../../tags/CryptoSymbol/CryptoSymbol'
import { colors } from '../../../../constants/colors'

export const tokensColumns = [
  {
    columnTitle: 'Symbol',
    cellComponent: (token: { name: string; symbol: string; logoURI: string }) => (
      <CryptoSymbol src={token.logoURI} symbol={token.symbol} />
    ),
  },
  {
    columnTitle: 'Name',
    cellComponent: (token: { name: string; symbol: string }) => (
      <p style={{ color: colors.grey.medium }}>{token.name}</p>
    ),
  },
]
