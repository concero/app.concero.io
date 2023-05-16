import { TxFromTo } from '../../tags/TxFromTo/TxFromTo.tsx'
import { colors } from '../../../constants/colors.ts'

export const columns = [
  {
    columnTitle: 'From / to',
    cellComponent: (item) => <TxFromTo item={item} />,
  },
  {
    columnTitle: 'Value',
    cellComponent: (item) => <p style={{ color: colors.grey.light }}>${item.value}</p>,
  },
  {
    columnTitle: 'When',
    headerStyle: { textAlign: 'right' },
    cellComponent: (item) => <p style={{ color: colors.text.secondary, textAlign: 'end' }}>{item.created_at}</p>,
  },
]
