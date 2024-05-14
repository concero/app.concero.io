import { type FC, type ReactComponentElement, useRef, useState } from 'react'
import { useAccount } from 'wagmi'
import classNames from './SwapCard.module.pcss'
import { type SwapCardProps } from './types'
import { useSwapReducer } from './swapReducer/swapReducer'
import { InsuranceProvider } from './InsuranceContext'
import { useSwapCardEffects } from './SwapCardEffects'
import { SwapInput } from './SwapInput/SwapInput'
import { SwapProgress } from './SwapProgress/SwapProgress'
import { SwapSettingsModal } from './SwapSettingsModal/SwapSettingsModal'
import { SwapCardStage } from './swapReducer/types'
import { ContactSupportCard } from '../ContactSupportCard/ContactSupportCard'
import posthog from 'posthog-js'
import { SwapCardHeader } from './SwapCardHeader/SwapCardHeader'

export const SwapCard: FC<SwapCardProps> = ({ isNewSwapCardMode }: SwapCardProps) => {
	const [swapState, swapDispatch] = useSwapReducer()
	const [txInfo, setTxInfo] = useState<{ duration: number; hash: string } | undefined>(undefined)
	const { address, connector } = useAccount()
	const typingTimeoutRef = useRef<number>()

	const handleGoBack = () => {
		swapDispatch({ type: 'RESET_AMOUNTS', direction: 'from' })
		swapDispatch({ type: 'RESET_AMOUNTS', direction: 'to' })
		swapDispatch({ type: 'CLEAR_ROUTES' })
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.input })
		swapDispatch({ type: 'SET_SWAP_STEPS', payload: [] })
	}

	const toggleInsurance = (routeId: string) => {
		swapDispatch({ type: 'TOGGLE_INSURANCE', payload: routeId })
	}

	function handleContactSupportGoBackClick() {
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
	}

	const infoToCopy = {
		...swapState.selectedRoute,
		replay_id: posthog.get_distinct_id(),
		session_id: posthog.get_session_id(),
	}

	const renderSwapStage: Record<SwapCardStage, ReactComponentElement<any>> = {
		[SwapCardStage.input]: (
			<SwapInput
				swapState={swapState}
				swapDispatch={swapDispatch}
				isNewSwapCardMode={isNewSwapCardMode}
				setTxInfo={setTxInfo}
			/>
		),
		[SwapCardStage.review]: (
			<SwapInput
				swapState={swapState}
				swapDispatch={swapDispatch}
				isNewSwapCardMode={isNewSwapCardMode}
				setTxInfo={setTxInfo}
			/>
		),
		[SwapCardStage.progress]: (
			<SwapProgress
				swapState={swapState}
				handleGoBack={handleGoBack}
				swapDispatch={swapDispatch}
				txDuration={txInfo}
			/>
		),
		[SwapCardStage.success]: (
			<SwapProgress
				swapState={swapState}
				handleGoBack={handleGoBack}
				swapDispatch={swapDispatch}
				txInfo={txInfo}
			/>
		),
		[SwapCardStage.failed]: (
			<SwapProgress
				swapState={swapState}
				handleGoBack={handleGoBack}
				swapDispatch={swapDispatch}
				txInfo={txInfo}
			/>
		),
		[SwapCardStage.contactSupport]: (
			<ContactSupportCard handleGoBackClick={handleContactSupportGoBackClick} infoToCopy={infoToCopy} />
		),
	}

	useSwapCardEffects({ swapState, swapDispatch, address, typingTimeoutRef, connector })

	return (
		<InsuranceProvider toggleInsurance={toggleInsurance}>
			<div className={`card ${classNames.container} ${isNewSwapCardMode ? classNames.abTestStyles : ''}`}>
				<SwapCardHeader swapState={swapState} swapDispatch={swapDispatch} />
				<div className={classNames.swapContainer}>{renderSwapStage[swapState.stage]}</div>
			</div>
			<SwapSettingsModal swapDispatch={swapDispatch} swapState={swapState} />
		</InsuranceProvider>
	)
}
