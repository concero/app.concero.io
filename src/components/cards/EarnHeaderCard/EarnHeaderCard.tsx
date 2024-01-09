import { type Dispatch, type FC, useState } from 'react'
import { IconArrowsUpDown, IconChevronLeft } from '@tabler/icons-react'
import classNames from './EarnHeaderCard.module.pcss'
import { Avatar } from '../../tags/Avatar/Avatar'
import { type EarnAction, type EarnState } from '../../screens/EarnScreen/earnReducer/types'
import { Button } from '../../buttons/Button/Button'
import { InfoCard } from './InfoCard/InfoCard'
import { ManageModal } from './ManageModal/ManageModal'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { useTranslation } from 'react-i18next'
import { action, category } from '../../../constants/tracking'
import { trackEvent } from '../../../hooks/useTracking'

interface EarnHeaderCardProps {
	earnState: EarnState
	earnDispatch: Dispatch<EarnAction>
}

export const EarnHeaderCard: FC<EarnHeaderCardProps> = ({ earnState, earnDispatch }) => {
	const isIpad = useMediaQuery('ipad')
	const [isManageModalOpen, setIsManageModalOpen] = useState(false)
	const { selectedVault } = earnState
	const isConnected = !!earnState.address
	const stakedAmount = selectedVault?.stakedAmount
	const { t } = useTranslation()

	const stakeButtonTitle = isConnected ? (stakedAmount ? t('button.menage') : t('button.stake')) : 'Connect wallet to swap'

	function handleManageButtonClick() {
		setIsManageModalOpen(true)
		trackEvent({ category: category.StakingHeader, action: action.Click, label: 'Manage button clicked' })
	}

	function handleGoBackButtonClick() {
		earnDispatch({ type: 'SET_SELECTED_VAULT', payload: null })
	}

	function InfoCards() {
		if (!stakedAmount) return null
		const poolShare = earnState.selectedVault?.poolShare ? `${earnState.selectedVault.poolShare}%` : 'unknown'
		const amountUsd = earnState.selectedVault?.stakedAmountUsd ? `$${earnState.selectedVault?.stakedAmountUsd}` : 'unknown'
		return (
			<div className={classNames.cardsContainer}>
				<InfoCard title={'Staked'} value={amountUsd} secondaryValue={'usd'} />
				<InfoCard title={'Staked'} value={stakedAmount} secondaryValue={earnState.selectedVault.symbol} />
				<InfoCard title={'Pool share'} value={poolShare} secondaryValue={'%'} />
			</div>
		)
	}

	return (
		<>
			<div className={classNames.wrapper}>
				{isIpad ? <Button variant={'subtle'} leftIcon={<IconChevronLeft />} className={stakedAmount ? classNames.backButton : ''} onClick={handleGoBackButtonClick} /> : null}
				<div className={classNames.innerContainer}>
					<div className={`card ${classNames.container} ${stakedAmount ? classNames.staked : ''}`}>
						<div className={classNames.headerContainer}>
							<div className={classNames.sideContainer}>
								<Avatar src={selectedVault.project?.logoURI} />
								<div>
									<h5 className={classNames.symbolTitle}>{selectedVault.symbol}</h5>
									<p className={`body1 ${classNames.protocolTitle}`}>{selectedVault?.name ?? ''}</p>
								</div>
							</div>
							{!isIpad ? (
								<div className={classNames.sideContainer}>
									<Button
										leftIcon={isConnected ? <IconArrowsUpDown size={16} color="white" /> : null}
										variant="primary"
										onClick={handleManageButtonClick}
										className={classNames.stakeButton}
										isDisabled={!earnState.address}
									>
										{stakeButtonTitle}
									</Button>
								</div>
							) : null}
						</div>
						{!isIpad ? <InfoCards /> : null}
					</div>
				</div>
			</div>
			{isIpad ? <InfoCards /> : null}
			{isIpad ? (
				<Button leftIcon={<IconArrowsUpDown size={16} color="white" />} variant="primary" onClick={handleManageButtonClick} isDisabled={!earnState.address}>
					{stakeButtonTitle}
				</Button>
			) : null}
			<ManageModal isOpen={isManageModalOpen} setIsOpen={setIsManageModalOpen} earnState={earnState} />
		</>
	)
}
