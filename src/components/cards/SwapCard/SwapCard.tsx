import { type FC, useContext, useRef } from 'react'
import { useAccount } from 'wagmi'
import { IconSettings2 } from '@tabler/icons-react'
import { CardHeader } from '../CardHeader/CardHeader'
import classNames from './SwapCard.module.pcss'
import { type SwapCardProps } from './types'
import { useSwapReducer } from './swapReducer/swapReducer'
import { SelectionContext } from '../../../hooks/SelectionContext'
import { InsuranceProvider } from './InsuranceContext'
import { useSwapCardEffects } from './SwapCardEffects'
import { SwapInput } from './SwapInput/SwapInput'
import { SwapProgress } from './SwapProgress/SwapProgress'
import { getCardTitleByStatus } from './handlers/getCardTitleByStatus'
import { SwapSettingsModal } from './SwapSettingsModal/SwapSettingsModal'
import { Button } from '../../buttons/Button/Button'
import { SwapCardStage } from './swapReducer/types'
import { ContactSupportCard } from '../ContactSupportCard/ContactSupportCard'
import posthog from 'posthog-js'

export const SwapCard: FC<SwapCardProps> = () => {
	const { selection, dispatch } = useContext(SelectionContext)
	const [swapState, swapDispatch] = useSwapReducer(selection)
	const { address, connector } = useAccount()
	const typingTimeoutRef = useRef(null)

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
	useSwapCardEffects({ swapState, swapDispatch, address, dispatch, typingTimeoutRef, connector })

	function handleContactSupportGoBackClick() {
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
	}

	const infoToCopy = { ...swapState.selectedRoute, replay_id: posthog.get_distinct_id(), session_id: posthog.get_session_id() }

	const renderSwapStage = {
		[SwapCardStage.input]: <SwapInput swapState={swapState} swapDispatch={swapDispatch} />,
		[SwapCardStage.progress]: <SwapProgress swapState={swapState} handleGoBack={handleGoBack} swapDispatch={swapDispatch} />,
		[SwapCardStage.success]: <SwapProgress swapState={swapState} handleGoBack={handleGoBack} swapDispatch={swapDispatch} />,
		[SwapCardStage.failed]: <SwapProgress swapState={swapState} handleGoBack={handleGoBack} swapDispatch={swapDispatch} />,
		[SwapCardStage.contactSupport]: <ContactSupportCard handleGoBackClick={handleContactSupportGoBackClick} infoToCopy={infoToCopy} />,
	}

	return (
		<InsuranceProvider toggleInsurance={toggleInsurance}>
			<div className={`card ${classNames.container}`}>
				<CardHeader title={getCardTitleByStatus(swapState.stage)}>
					<div className={classNames.cardHeader}>
						<Button
							variant="black"
							size="sq-sm"
							onClick={() => {
								swapDispatch({ type: 'TOGGLE_SETTINGS_MODAL_OPEN' })
							}}
							leftIcon={<IconSettings2 size={16} color={'var(--color-grey-500)'} />}
						/>
					</div>
				</CardHeader>
				<div className={classNames.swapContainer}>{renderSwapStage[swapState.stage]}</div>
			</div>
			<SwapSettingsModal
				show={swapState.settingsModalOpen}
				setShow={() => {
					swapDispatch({ type: 'TOGGLE_SETTINGS_MODAL_OPEN' })
				}}
				swapDispatch={swapDispatch}
				settings={swapState.settings}
			/>
		</InsuranceProvider>
	)
}
