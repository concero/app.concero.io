import { useRef, useState, useCallback } from 'react'
import { useSwapReducer } from './swapReducer/swapReducer'
import { useSwapCardEffects } from './PoolCardEffects'
import { SwapInput } from './SwapInput/SwapInput'
import { SwapProgress } from './SwapProgress/SwapProgress'
import { SwapCardStage } from './swapReducer/types'
import { Button } from '../../buttons/Button/Button'
import { Modal } from '../../modals/Modal/Modal'
import classNames from './PoolCard.module.pcss'
import { useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react'
import { TooltipWrapper } from '../../layout/WithTooltip/TooltipWrapper'

interface Props {
	isDepositOnly?: boolean
	depositButtonClasses?: string
	withdrawalButtonClasses?: string
	poolIsFilled?: boolean
	userIsNotDeposited?: boolean
}

const poolDescription = 'The pool has reached its max capacity and you cannot deposit money into it.'

export const PoolCard = ({
	isDepositOnly = false,
	depositButtonClasses,
	withdrawalButtonClasses,
	poolIsFilled,
	userIsNotDeposited,
}: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [swapState, swapDispatch] = useSwapReducer()
	const { address, isConnected } = useAccount()
	const { open } = useAppKit()

	const typingTimeoutRef = useRef<number>()

	const isInputStages = swapState.stage === SwapCardStage.input || swapState.stage === SwapCardStage.review

	const handleGoBack = useCallback(() => {
		swapDispatch({ type: 'RESET_AMOUNTS', direction: 'from' })
		swapDispatch({ type: 'RESET_AMOUNTS', direction: 'to' })
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.input })
		swapDispatch({ type: 'SET_SWAP_STEPS', payload: [] })
	}, [swapDispatch])

	useSwapCardEffects({ swapDispatch, swapState, address, typingTimeoutRef })

	const handleClose = () => {
		handleGoBack()
		setIsOpen(false)
	}

	const disabledDepositButton = (
		<TooltipWrapper
			classNameWrapper={depositButtonClasses}
			className={classNames.tooltip}
			tooltipId={'deposit-button'}
			tooltipContent={
				<div className="gap-xs">
					<h6>Pool is filled</h6>
					<p>{poolDescription}</p>
				</div>
			}
		>
			<Button className={depositButtonClasses} isFull isDisabled={true} size="lg">
				Deposit
			</Button>
		</TooltipWrapper>
	)

	const depositButton = poolIsFilled ? (
		isConnected ? (
			disabledDepositButton
		) : (
			<Button
				isDisabled={false}
				className={depositButtonClasses}
				onClick={async () => {
					await open()
				}}
				size="lg"
			>
				Connect wallet
			</Button>
		)
	) : (
		<Button
			isDisabled={false}
			className={depositButtonClasses}
			size="lg"
			isFull
			onClick={() => {
				swapDispatch({ type: 'TOGGLE_POOL_MODE', payload: 'deposit' })
				setIsOpen(true)
			}}
		>
			Deposit
		</Button>
	)

	const withdrawalButton = (
		<Button
			isDisabled={!address || userIsNotDeposited}
			className={withdrawalButtonClasses}
			onClick={() => {
				swapDispatch({ type: 'TOGGLE_POOL_MODE', payload: 'withdraw' })
				setIsOpen(true)
			}}
			size="lg"
			variant="secondaryColor"
		>
			Withdraw
		</Button>
	)

	return (
		<>
			{isDepositOnly ? (
				depositButton
			) : (
				<div className={classNames.buttons}>
					{depositButton}
					{withdrawalButton}
				</div>
			)}

			<Modal
				position="top"
				className={classNames.container}
				isHeaderVisible={false}
				show={isOpen}
				setShow={handleClose}
			>
				{isInputStages ? (
					<SwapInput onClose={handleClose} swapState={swapState} swapDispatch={swapDispatch} />
				) : (
					<SwapProgress swapState={swapState} swapDispatch={swapDispatch} handleGoBack={handleGoBack} />
				)}
			</Modal>
		</>
	)
}
