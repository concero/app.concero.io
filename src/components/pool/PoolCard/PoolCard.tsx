import { useRef, useState } from 'react'
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
import { TooltipWrapper } from '../../wrappers/WithTooltip/TooltipWrapper'

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

	const handleGoBack = () => {
		swapDispatch({ type: 'RESET_AMOUNTS', direction: 'from' })
		swapDispatch({ type: 'RESET_AMOUNTS', direction: 'to' })
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.input })
		swapDispatch({ type: 'SET_SWAP_STEPS', payload: [] })
	}

	useSwapCardEffects({ swapDispatch, swapState, address, typingTimeoutRef })

	const handeClose = () => {
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

	const depositButton = !poolIsFilled ? (
		disabledDepositButton
	) : (
		<Button
			isDisabled={poolIsFilled}
			className={depositButtonClasses}
			onClick={
				isConnected
					? () => {
							swapDispatch({ type: 'TOGGLE_POOL_MODE', payload: 'deposit' })
							setIsOpen(true)
						}
					: open
			}
			size="lg"
		>
			{isConnected ? 'Deposit' : 'Connect wallet'}
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
			Withdrawal
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
				setShow={handeClose}
			>
				{isInputStages ? (
					<SwapInput onClose={handeClose} swapState={swapState} swapDispatch={swapDispatch} />
				) : (
					<SwapProgress swapState={swapState} swapDispatch={swapDispatch} handleGoBack={handleGoBack} />
				)}
			</Modal>
		</>
	)
}
