import { useContext } from 'react'
import { TxFromTo } from '../../tags/TxFromTo/TxFromTo'
import { colors } from '../../../constants/colors'
import { DotsIconButton } from './DotsIconButton'
import { numberToFormatString, unixtimeFromNow } from '../../../utils/formatting'
import { SelectionContext } from '../../../hooks/SelectionContext'

export const columns = (setModalData, setIsModalOpen) => [
	{
		columnTitle: 'From / to',
		cellComponent: item => {
			if (!item) return null
			const { selection } = useContext(SelectionContext)
			const type = item.baseCurrency?.address === item.buyCurrency.address ? 'buy' : 'sell'
			return (
				<TxFromTo
					from={{
						amount: numberToFormatString(item.baseAmount, 3),
						symbol: item.baseCurrency?.symbol,
					}}
					to={{
						amount: numberToFormatString(item.quoteAmount, 3),
						symbol: item.quoteCurrency?.symbol,
					}}
					type={type}
				/>
			)
		},
	},
	{
		columnTitle: 'When',
		cellComponent: item => {
			if (!item) return null
			return (
				<div
					style={{
						alignItems: 'center',
						flexDirection: 'row',
						gap: 10,
					}}
				>
					<p
						style={{
							color: colors.text.secondary,
							textAlign: 'end',
						}}
					>
						{unixtimeFromNow(item.block?.timestamp.unixtime)}
					</p>
				</div>
			)
		},
	},
	{
		columnTitle: '',
		cellComponent: item => {
			if (!item) return null
			return (
				<DotsIconButton
					onCLick={() => {
						setModalData(item)
						setIsModalOpen(true)
					}}
				/>
			)
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
//       const PopoverComponent = WithPopover(DotsIconButton, ModalPopover, { item }, 'click')
//       return <PopoverComponent />
//     },
//   },
// ]
