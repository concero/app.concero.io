import { TxFromTo } from '../../tags/TxFromTo/TxFromTo'
import { colors } from '../../../constants/colors'
import { WithPopover } from '../../wrappers/WithPopover'
import { ModalPopover } from './ModalPopover'
import { IconWithPopover } from './IconWithPopover'

export const columns = [
  {
    columnTitle: 'From / to',
    cellComponent: (item) => <TxFromTo item={item} />,
  },
  {
    columnTitle: 'When',
    cellComponent: (item) => {
      return (
        <div style={{ alignItems: 'center', flexDirection: 'row', gap: 10 }}>
          <p
            style={{
              color: colors.text.secondary,
              textAlign: 'end',
            }}
          >
            {item.created_at}
          </p>
        </div>
      )
    },
  },
  {
    columnTitle: '',
    cellComponent: (item) => {
      const PopoverComponent = WithPopover(IconWithPopover, ModalPopover, { item }, 'click')
      return <PopoverComponent />
    },
  },
]
