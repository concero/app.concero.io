import { type FC, useEffect, useState } from 'react'
import classNames from './SwapProgress.module.pcss'
import { TransactionStep } from './TransactionStep/TransactionStep'
import { SwapCardStage, type SwapState } from '../swapReducer/types'
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

interface SwapProgressProps {
	swapState: SwapState
	handleGoBack: () => void
}

export const SwapProgress: FC<SwapProgressProps> = ({ swapState, handleGoBack }) => {
	const [time, setTime] = useState(0)
	const { to, from, steps, stage } = swapState

	const isFailed = stage === SwapCardStage.failed
	const isSuccess = stage === SwapCardStage.success
	const currentStep = steps[steps.length - 1]
	const isAwait = currentStep && currentStep.status === 'await'

	useEffect(() => {
		const timerId = setInterval(() => {
			if (isAwait || isSuccess || isFailed) return

			setTime(prev => prev + 1)
		}, 1000)

		if (isSuccess || isAwait || isFailed) {
			clearInterval(timerId)
		}

		return () => {
			clearInterval(timerId)
		}
	}, [swapState])

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
		[SwapCardStage.success]: 'Swap Successful!',
		[SwapCardStage.warning]: 'Uh Oh...',
	}

	const progressDetails = (
		<>
			<SwapProgressDetails from={from} to={to} />

			<div className={classNames.progressContainer}>
				<TransactionStep status={steps[0]?.status} title="Approvals" />
				<TrailArrowRightIcon />
				<TransactionStep status={steps[1]?.status} title="Request" />
				<TrailArrowRightIcon />
				<TransactionStep status={steps[2]?.status} title="Deposit" />
			</div>

			<Separator />

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
					title={currentStep.title}
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

			{isSuccess ? <FinishTxInfo time={time} to={to} /> : progressDetails}

			{renderButtons[stage] ?? null}
		</div>
	)
}
