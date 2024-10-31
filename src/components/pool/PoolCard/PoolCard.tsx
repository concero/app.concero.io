import { useState } from 'react'
import { useSwapReducer } from './swapReducer/swapReducer'
import { useSwapCardEffects } from './PoolCardEffects'
import { SwapInput } from './SwapInput/SwapInput'
import { SwapProgress } from './SwapProgress/SwapProgress'
import { SwapCardStage } from './swapReducer/types'
import { Button } from '../../buttons/Button/Button'
import { Modal } from '../../modals/Modal/Modal'
import classNames from './PoolCard.module.pcss'
import { useAccount } from 'wagmi'

export const PoolCard = () => {
	const { address } = useAccount()
	const [swapState, swapDispatch] = useSwapReducer()

	const isInputStage = swapState.stage === SwapCardStage.input
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const handleGoBack = () => {
		swapDispatch({ type: 'RESET_AMOUNTS', direction: 'from' })
		swapDispatch({ type: 'RESET_AMOUNTS', direction: 'to' })
		swapDispatch({ type: 'CLEAR_ROUTES' })
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.input })
		swapDispatch({ type: 'SET_SWAP_STEPS', payload: [] })
	}

	useSwapCardEffects({ swapDispatch, swapState, address })

	return (
		<>
			<Button
				className={classNames.button}
				onClick={() => {
					setIsOpen(true)
				}}
				size="lg"
			>
				Deposit
			</Button>

			<Modal
				position="top"
				className={classNames.container}
				isHeaderVisible={false}
				show={isOpen}
				setShow={setIsOpen}
			>
				{isInputStage ? (
					<SwapInput swapState={swapState} swapDispatch={swapDispatch} />
				) : (
					<SwapProgress swapState={swapState} handleGoBack={handleGoBack} />
				)}
			</Modal>
		</>
	)
}
