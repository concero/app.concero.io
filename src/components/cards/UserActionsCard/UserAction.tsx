import classNames from './UserActionsCard.module.pcss'
import BlockiesSvg from 'blockies-react-svg'
import { poolEventNamesMap } from '../../../api/concero/getUserActions'
import dayjs from 'dayjs'
import { UserActionStatus, type UserTransaction } from './UserActionsCard'
import { Button } from '../../buttons/Button/Button'
import { completeWithdrawal } from '../PoolCard/swapExecution/requestWithdraw'
import { useAccount } from 'wagmi'
import { type ReactNode, useState } from 'react'
import { TransactionStatus } from '../../../api/concero/types'
import { getWalletClient } from '@wagmi/core'
import { config } from '../../../web3/wagmi'

const renderStatusTag = (action: UserTransaction) => {
	const [status, setStatus] = useState<TransactionStatus>(TransactionStatus.IDLE)
	const { address, chainId } = useAccount()

	const handleCompleteWithdrawal = async () => {
		if (status === TransactionStatus.IDLE || status === TransactionStatus.FAILED) {
			try {
				setStatus(TransactionStatus.PENDING)

				const walletClient = await getWalletClient(config, { chainId })
				const txStatus = await completeWithdrawal(address!, walletClient)

				setStatus(txStatus)
			} catch (error) {
				setStatus(TransactionStatus.FAILED)
				console.error(error)
			}
		}
	}

	const stageButtonsMap: Record<TransactionStatus, ReactNode> = {
		[TransactionStatus.IDLE]: (
			<Button size="sm" onClick={handleCompleteWithdrawal}>
				Claim
			</Button>
		),
		[TransactionStatus.FAILED]: (
			<Button className={classNames.errorButton} onClick={handleCompleteWithdrawal} size="sm">
				Error, try again
			</Button>
		),
		[TransactionStatus.SUCCESS]: (
			<Button className={classNames.successButton} isDisabled={true} size="sm">
				Claimed success{' '}
			</Button>
		),
		[TransactionStatus.PENDING]: (
			<Button variant="subtle" isLoading={true} size="sm">
				Loading
			</Button>
		),
	}

	if (action.status === UserActionStatus.ActiveRequestWithdraw && address) {
		return stageButtonsMap[status]
	}

	return null
}

export const UserAction = ({ action }: { action: UserTransaction }) => {
	return (
		<div className={classNames.action}>
			<div className={classNames.leftSide}>
				<BlockiesSvg className={classNames.avatar} address={action.address} width={32} height={32} />
				<div>
					<h5>{poolEventNamesMap[action.eventName]}</h5>
					<p className="body1">{dayjs(action.time).format('D MMMM, HH:mm, YYYY')}</p>
				</div>
			</div>
			<div className={classNames.rightSide}>
				{action.deadline}
				{action.status === UserActionStatus.ActiveRequestWithdraw && renderStatusTag(action)}
				{action.amount ? <h4>{action.amount} USDC</h4> : null}
			</div>
		</div>
	)
}
