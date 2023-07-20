import { CryptoSymbol } from '../../tags/CryptoSymbol/CryptoSymbol'
import { colors } from '../../../constants/colors'

export const columns = [
  // {
  //   columnTitle: 'Symbol',
  //   cellComponent: (item) => <CryptoSymbol src={item.logoURI} symbol={item.symbol} />,
  // },
  // {
  //   columnTitle: 'Name',
  //   cellComponent: (item) => <p className="body1">{item.name}</p>,
  // },
  // {
  //   columnTitle: 'Balance',
  //   cellComponent: (item) => <p className="body1">{item.balance}</p>,
  // },
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
