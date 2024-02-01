import { type Dispatch, type FC } from 'react'
import classNames from './SwapSettingsModal.module.pcss'
import { Modal } from '../../../modals/Modal/Modal'
import { type SwapAction, type SwapState } from '../swapReducer/types'
import { useTranslation } from 'react-i18next'
import { Slippage } from './Slippage'
import { Toggle } from '../../../layout/Toggle/Toggle'

export interface SwapSettingsModalProps {
	swapState: SwapState
	swapDispatch: Dispatch<SwapAction>
}

export const SwapSettingsModal: FC<SwapSettingsModalProps> = ({ swapDispatch, swapState }) => {
	const { t } = useTranslation()
	const { settings, settingsModalOpen, isDestinationAddressVisible } = swapState

	return (
		<Modal
			title={t('swapCard.settings.title')}
			show={settingsModalOpen}
			setShow={() => {
				swapDispatch({ type: 'TOGGLE_SETTINGS_MODAL_OPEN' })
			}}
		>
			<div className={classNames.container}>
				<Slippage settings={settings} swapDispatch={swapDispatch} />
				{/* <GasPrice settings={settings} swapDispatch={swapDispatch} /> */}
				<div className={`card ${classNames.cardContainer} ${classNames.toggleButtonContainer}`}>
					<p className={'body1'}>{t('swapCard.settings.showDestinationWallet')}</p>
					<Toggle
						checkedClassName={classNames.toggleButton}
						isChecked={isDestinationAddressVisible}
						onChange={(checked: boolean) => {
							swapDispatch({
								type: 'SET_IS_DESTINATION_ADDRESS_VISIBLE',
								status: checked,
							})
						}}
					/>
				</div>
			</div>
		</Modal>
	)
}
