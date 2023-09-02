import { CryptoSymbol } from '../../../tags/CryptoSymbol/CryptoSymbol'
import { colors } from '../../../../constants/colors'

export const ChainColumns = [
  {
    columnTitle: 'Symbol',
    cellComponent: (chain: { name: string; symbol: string }) => <CryptoSymbol src={chain.logoURI} symbol={chain.coin} />,
  },
  {
    columnTitle: 'Name',
    cellComponent: (chain: { name: string; symbol: string }) => <p style={{ color: colors.grey.medium }}>{chain.name}</p>,
  },
]
