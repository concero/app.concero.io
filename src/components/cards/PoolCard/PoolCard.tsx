import { useState } from 'react'
import { useAccount } from 'wagmi'
import classNames from './PoolCard.module.pcss'
import { useSwapReducer } from './swapReducer/swapReducer'
import { useSwapCardEffects } from './PoolCardEffects'
import { SwapInput } from './SwapInput/SwapInput'
import { SwapProgress } from './SwapProgress/SwapProgress'
import { SwapCardStage } from './swapReducer/types'
import { ContactSupportCard } from '../ContactSupportCard/ContactSupportCard'
import posthog from 'posthog-js'
import { SwapCardHeader } from './SwapCardHeader/SwapCardHeader'

export const PoolCard = () => {
	const [swapState, swapDispatch] = useSwapReducer()
	const [txInfo, setTxInfo] = useState<{ duration: number; hash: string } | undefined>(undefined)
	const { address, connector } = useAccount()

	const handleGoBack = () => {
		swapDispatch({ type: 'RESET_AMOUNTS', direction: 'from' })
		swapDispatch({ type: 'RESET_AMOUNTS', direction: 'to' })
		swapDispatch({ type: 'CLEAR_ROUTES' })
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.input })
		swapDispatch({ type: 'SET_SWAP_STEPS', payload: [] })
	}

	function handleContactSupportGoBackClick() {
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
	}

	const infoToCopy = {
		...swapState.selectedRoute,
		replay_id: posthog.get_distinct_id(),
		session_id: posthog.get_session_id(),
	}

	const renderSwapStage =
		swapState.stage === SwapCardStage.input ? (
			<SwapInput
				swapState={swapState}
				swapDispatch={swapDispatch}
				isNewSwapCardMode={true}
				setTxInfo={setTxInfo}
			/>
		) : (
			<SwapProgress
				swapState={swapState}
				handleGoBack={handleGoBack}
				swapDispatch={swapDispatch}
				txInfo={txInfo}
			/>
		)

	useSwapCardEffects({ swapState, swapDispatch, address, connector })

	return (
		<div className={`card ${classNames.container}`}>
			<SwapCardHeader swapState={swapState} swapDispatch={swapDispatch} />
			<div className={classNames.swapContainer}>
				{renderSwapStage}
				{swapState.stage === SwapCardStage.contactSupport && (
					<ContactSupportCard handleGoBackClick={handleContactSupportGoBackClick} infoToCopy={infoToCopy} />
				)}
			</div>
		</div>
	)
}
