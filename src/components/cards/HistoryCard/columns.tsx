import { useContext } from 'react'
import { TxFromTo } from '../../tags/TxFromTo/TxFromTo'
import { colors } from '../../../constants/colors'
import { WithPopover } from '../../wrappers/WithPopover'
import { ModalPopover } from './ModalPopover'
import { IconWithPopover } from './IconWithPopover'
import { numberToFormatString, unixtimeFromNow } from '../../../utils/formatting'
import { SelectionContext } from '../../../hooks/SelectionContext'

export const columns = [
  {
    columnTitle: 'From / to',
    cellComponent: (item) => {
      const { selection } = useContext(SelectionContext)
      const type = item.baseCurrency.address === item.buyCurrency.address ? 'buy' : 'sell'
      return (
        <TxFromTo
          from={{ amount: numberToFormatString(item.baseAmount, 3), symbol: item.baseCurrency.symbol }}
          to={{ amount: numberToFormatString(item.quoteAmount, 3), symbol: item.quoteCurrency.symbol }}
          type={type}
        />
      )
    },
  },
  {
    columnTitle: 'When',
    cellComponent: (item) => (
      <div style={{ alignItems: 'center', flexDirection: 'row', gap: 10 }}>
        <p
          style={{
            color: colors.text.secondary,
            textAlign: 'end',
          }}
        >
          {unixtimeFromNow(item.block.timestamp.unixtime)}
        </p>
      </div>
    ),
  },
  {
    columnTitle: '',
    cellComponent: (item) => {
      const PopoverComponent = WithPopover(IconWithPopover, ModalPopover, { item }, 'click')
      return <PopoverComponent />
    },
  },
]

// OLD (DEXTOOLS + DEXSCREENER)
// export const columns = [
//   {
//     columnTitle: 'From / to',
//     cellComponent: (item) => <TxFromTo item={item} />,
//   },
//   {
//     columnTitle: 'When',
//     cellComponent: (item) => {
//       return (
//         <div style={{ alignItems: 'center', flexDirection: 'row', gap: 10 }}>
//           <p
//             style={{
//               color: colors.text.secondary,
//               textAlign: 'end',
//             }}
//           >
//             {item.created_at}
//           </p>
//         </div>
//       )
//     },
//   },
//   {
//     columnTitle: '',
//     cellComponent: (item) => {
//       const PopoverComponent = WithPopover(IconWithPopover, ModalPopover, { item }, 'click')
//       return <PopoverComponent />
//     },
//   },
// ]
