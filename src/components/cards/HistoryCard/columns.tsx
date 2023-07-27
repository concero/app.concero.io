import { TxFromTo } from '../../tags/TxFromTo/TxFromTo'
import { colors } from '../../../constants/colors'

export const columns = [
  {
    columnTitle: 'From / to',
    cellComponent: (item) => <TxFromTo item={item} />,
  },
  {
    columnTitle: 'When',
    cellComponent: (item) => (
      <p
        style={{
          color: colors.text.secondary,
          textAlign: 'end',
        }}
      >
        {item.created_at}
      </p>
    ),
  },
]
