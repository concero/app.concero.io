import { type Dispatch, type FC, useEffect, useState } from 'react'
import classNames from './SwapProgress.module.pcss'
import { TransactionStep } from './TransactionStep/TransactionStep'
import { StageType, type SwapAction, SwapCardStage, type SwapState } from '../swapReducer/types'
import { Separator } from '../../../layout/Separator/Separator'
import { Alert } from '../../../layout/Alert/Alert'
import { Loader } from '../../../layout/Loader/Loader'
import { TrailArrowRightIcon } from '../../../../assets/icons/TrailArrowRightIcon'
import { InfoIcon } from '../../../../assets/icons/InfoIcon'
import { PencilIcon } from '../../../../assets/icons/PencilIcon'
import { CrossIcon } from '../../../../assets/icons/CrossIcon'
import { FinishTxInfo } from './FinishTxInfo/FinishTxInfo'
import { SwapProgressDetails } from './SwapProgressDetails/SwapProgressDetails'
import { Button } from '../../../buttons/Button/Button'
import { IconButton } from '../../../buttons/IconButton/IconButton'
import { Tag } from '../../../tags/Tag/Tag'
import { TimeIcon } from '../../../../assets/icons/TimeIcon'
import { trackEvent } from '../../../../hooks/useTracking'
import { action, category } from '../../../../constants/tracking'

interface SwapProgressProps {
	swapState: SwapState
	handleGoBack: () => void
	swapDispatch: Dispatch<SwapAction>
}

const getTimerStatus = (time: number) => {
	if (time > 20) return 'neutral'
	if (time > 10) return 'warning'
	return 'negative'
}

const statusColorMap = {
	neutral: 'var(--color-grey-700)',
	warning: 'var(--color-warning-700)',
	negative: 'var(--color-danger-700)',
}

export const SwapProgress: FC<SwapProgressProps> = ({ swapState, swapDispatch, handleGoBack }) => {
	const [time, setTime] = useState(60)
	const { to, from, steps, stage, poolMode } = swapState

	const isFailed = stage === SwapCardStage.failed
	const isSuccess = stage === SwapCardStage.success
	const currentStep = steps[steps.length - 1]
	const isAwait = currentStep && currentStep.status === 'await'

	const isDeposit = poolMode === 'deposit'
	const isDepositRequested = steps[1] ? steps[1].type === StageType.requestTx && steps[1].status === 'success' : false
	const isDepositTxSigned = steps[2] ? steps[2].type === StageType.transactionSigned : false

	const cancelTransaction = () => {
		window.ethereum = null

		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
		swapDispatch({
			type: 'UPSERT_SWAP_STEP',
			payload: {
				title: 'Transaction failed',
				body: 'Something went wrong',
				status: 'error',
			},
		})

		void trackEvent({
			category: category.PoolCard,
			action: action.FailedDeposit,
			label: 'concero_failed_deposit_time_expired',
			data: { from: swapState.from, to: swapState.to },
		})
	}

	useEffect(() => {
		if (!isDepositRequested) return

		const timerId = setInterval(() => {
			setTime(prevTime => {
				if (prevTime < 0 && isFailed) {
					cancelTransaction()
					clearInterval(timerId)
				}

				return prevTime - 1
			})

			if (isDepositTxSigned) {
				clearInterval(timerId)
			}
		}, 1000)

		return () => {
			clearInterval(timerId)
		}
	}, [isDepositRequested])

	const renderButtons: Record<string, JSX.Element> | Record<string, null> = {
		[SwapCardStage.failed]: (
			<div className="gap-lg w-full">
				<Separator />
				<Button isFull onClick={handleGoBack} variant="secondaryColor" size="lg">
					Try again
				</Button>
			</div>
		),
		[SwapCardStage.success]: (
			<div className="gap-lg w-full">
				<Separator />
				<Button isFull onClick={handleGoBack} variant="secondaryColor" size="lg">
					Go to pool
				</Button>
			</div>
		),
	}

	const title: Record<string, string> | Record<string, null> = {
		[SwapCardStage.progress]: 'Transaction in progress...',
		[SwapCardStage.failed]: 'Transaction failed',
		[SwapCardStage.success]: `${isDeposit ? 'Deposit' : 'Withdrawal Request'} Successful!`,
		[SwapCardStage.warning]: 'Uh Oh...',
	}

	const progressDetails = (
		<>
			<SwapProgressDetails from={from} to={to} />

			<div className={classNames.progressContainer}>
				<TransactionStep status={steps[0]?.status} title="Approvals" />
				<TrailArrowRightIcon />
				{isDeposit && (
					<>
						<TransactionStep status={steps[1]?.status} title="Request" />
						<TrailArrowRightIcon />
					</>
				)}
				<TransactionStep status={steps[isDeposit ? 2 : 1]?.status} title="Deposit" />
			</div>

			<Separator />

			{isDepositRequested && time > 0 && !isDepositTxSigned && (
				<Tag
					variant={getTimerStatus(time)}
					size="md"
					leftIcon={<TimeIcon color={statusColorMap[getTimerStatus(time)]} />}
				>
					Time to signature: {time}s
				</Tag>
			)}

			{isAwait && (
				<div className={classNames.infoMessage}>
					<div className={classNames.wrapIcon}>
						<PencilIcon />
					</div>
					<h4 className={classNames.messageTitle}>Signature required</h4>
					<p className={classNames.messageSubtitle}>Please open your wallet and sign the transaction</p>
				</div>
			)}

			{currentStep && !isAwait && (
				<Alert
					title={isFailed ? 'Transaction failed' : currentStep.title}
					variant={isFailed ? 'error' : 'neutral'}
					icon={isFailed ? <InfoIcon color="var(--color-danger-700)" /> : <Loader variant="neutral" />}
				/>
			)}
		</>
	)

	return (
		<div className={classNames.container}>
			<div className={classNames.header}>
				<h4>{title[stage] ?? ''}</h4>
				{(isSuccess || isFailed) && (
					<IconButton onClick={handleGoBack} className={classNames.closeButton} variant="secondary" size="md">
						<CrossIcon />
					</IconButton>
				)}
			</div>

			{isSuccess ? <FinishTxInfo isDeposit={isDeposit} to={to} /> : progressDetails}

			{renderButtons[stage] ?? null}
		</div>
	)
}
