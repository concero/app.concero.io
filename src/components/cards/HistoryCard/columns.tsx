import { TxFromTo } from '../../tags/TxFromTo/TxFromTo'
import { colors } from '../../../constants/colors'
import { WithPopover } from '../../wrappers/WithPopover'
import { ModalPopover } from './ModalPopover'
import { Button } from '../../buttons/Button/Button'

const IconWithPopover = () => {
  return (
    <Button
      variant={'subtle'}
      size={'xs'}
      leftIcon={{
        name: 'Dots',
        iconProps: {
          size: 20,
          color: colors.text.secondary,
        },
      }}
    />
  )
}

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
      const PopoverComponent = WithPopover(IconWithPopover, ModalPopover, { item }, 'hover')
      return <PopoverComponent />
    },
  },
]
