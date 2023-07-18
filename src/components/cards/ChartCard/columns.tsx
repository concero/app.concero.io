import { CryptoSymbol } from '../../tags/CryptoSymbol/CryptoSymbol'

export const columns = [
  {
    columnTitle: 'Symbol',
    cellComponent: (item) => <CryptoSymbol src={item.logoURI} symbol={item.symbol} />,
  },
  {
    columnTitle: 'Name',
    cellComponent: (item) => <p className="body1">{item.name}</p>,
  },
  {
    columnTitle: 'Balance',
    cellComponent: (item) => <p className="body1">{item.balance}</p>,
  },
]
