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

interface Props {
	isDepositOnly?: boolean
}

export const PoolCard = ({ isDepositOnly = false }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [swapState, swapDispatch] = useSwapReducer()
	const { address } = useAccount()
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

	return (
		<>
			<div className={classNames.buttons}>
				<Button
					className={classNames.button}
					onClick={() => {
						swapDispatch({ type: 'TOGGLE_POOL_MODE', payload: 'deposit' })
						setIsOpen(true)
					}}
					size="lg"
				>
					Deposit
				</Button>
				{!isDepositOnly && (
					<Button
						onClick={() => {
							swapDispatch({ type: 'TOGGLE_POOL_MODE', payload: 'withdraw' })
							setIsOpen(true)
						}}
						size="lg"
						variant="secondaryColor"
					>
						Withdrawal
					</Button>
				)}
			</div>

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
					<SwapProgress swapState={swapState} handleGoBack={handleGoBack} />
				)}
			</Modal>
		</>
	)
}
