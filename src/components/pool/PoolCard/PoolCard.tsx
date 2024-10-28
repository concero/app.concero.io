import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useSwapReducer } from './swapReducer/swapReducer'
import { useSwapCardEffects } from './PoolCardEffects'
import { SwapInput } from './SwapInput/SwapInput'
import { SwapProgress } from './SwapProgress/SwapProgress'
import { SwapCardStage } from './swapReducer/types'
import { SwapCardHeader } from './SwapCardHeader/SwapCardHeader'
import { Button } from '../../buttons/Button/Button'
import { Modal } from '../../modals/Modal/Modal'

export const PoolCard = () => {
	const [swapState, swapDispatch] = useSwapReducer()
	const { address, connector } = useAccount()

	const isInputStage = swapState.stage === SwapCardStage.input
	// const isSuccess = swapState.stage === SwapCardStage.success

	const [isOpen, setIsOpen] = useState<boolean>(false)

	const handleGoBack = () => {
		swapDispatch({ type: 'RESET_AMOUNTS', direction: 'from' })
		swapDispatch({ type: 'RESET_AMOUNTS', direction: 'to' })
		swapDispatch({ type: 'CLEAR_ROUTES' })
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.input })
		swapDispatch({ type: 'SET_SWAP_STEPS', payload: [] })
	}

	useSwapCardEffects({ swapState, swapDispatch, address, connector })

	return (
		<>
			<Button
				onClick={() => {
					setIsOpen(true)
				}}
				size="lg"
			>
				Deposit
			</Button>

			<Modal isHeaderVisible={false} show={isOpen} setShow={setIsOpen}>
				<SwapCardHeader swapState={swapState} swapDispatch={swapDispatch} />
				{isInputStage ? (
					<SwapInput swapState={swapState} swapDispatch={swapDispatch} />
				) : (
					<SwapProgress swapState={swapState} handleGoBack={handleGoBack} />
				)}
			</Modal>
		</>
	)
}
