import classNames from './RewardsUserHistory.module.pcss'
import { type IConceroInfraTx } from '../../../api/concero/transactionType'
import { useEffect, useState } from 'react'
import { formatUnits } from 'viem'
import { formatDateTime, numberToFormatString } from '../../../utils/formatting'

interface UserActionProps {
	type: 'swap' | 'quest'
	transaction?: IConceroInfraTx
	quest?: any // TODO add type quest
}

export const UserAction = ({ transaction, type }: UserActionProps) => {
	const [value, setValue] = useState('')

	const getTransactionInfo = async () => {
		const { from, to } = transaction!

		const fromSide = from.token
			? `${numberToFormatString(Number(formatUnits(BigInt(from.amount), from.token.decimals)))} ${from.token.symbol}`
			: 'n/a'
		const toSide = to.token
			? `${numberToFormatString(Number(formatUnits(BigInt(to.amount), to.token.decimals)))} ${to.token.symbol}`
			: 'n/a'

		const txValue = `${fromSide} > ${toSide}`
		setValue(txValue)
	}

	useEffect(() => {
		if (type === 'swap' && transaction) {
			void getTransactionInfo()
		}
	}, [])

	return (
		<div className={classNames.userAction}>
			<div className="row jsb ac">
				<p className="body4">{type ? 'Swap' : 'Quest complete'}</p>
				<span className={classNames.userTag}>+5 xp</span>
			</div>
			<div className="row jsb ac">
				<span className={classNames.titleUserAction}>{value}</span>
				<p className="body4">
					{transaction && formatDateTime(new Date(transaction.timestamp * 1000), 'D MMM, YYYY, hh:mm')}
				</p>
			</div>
		</div>
	)
}
