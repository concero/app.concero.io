import { Dispatch, FC, useState } from 'react'
import { IconArrowsUpDown, IconChevronLeft } from '@tabler/icons-react'
import classNames from './StakingHeaderCard.module.pcss'
import { Avatar } from '../../tags/Avatar/Avatar'
import { StakingAction, StakingState } from '../../screens/StakingScreen/stakingReducer/types'
import { formatNumber, numberToFormatString } from '../../../utils/formatting'
import { Button } from '../../buttons/Button/Button'
import { InfoCard } from './InfoCard/InfoCard'
import { ManageModal } from './ManageModal/ManageModal'
import { useMediaQuery } from '../../../hooks/useMediaQuery'

interface StakingHeaderCardProps {
	stakingState: StakingState
	stakingDispatch: Dispatch<StakingAction>
}

export const StakingHeaderCard: FC<StakingHeaderCardProps> = ({ stakingState, stakingDispatch }) => {
	const isIpad = useMediaQuery('ipad')
	const [isManageModalOpen, setIsManageModalOpen] = useState(false)
	const { selectedVault } = stakingState
	const isConnected = !!stakingState.address
	const stakedAmount = formatNumber(selectedVault?.stakedAmount, {
		decimals: selectedVault?.decimals,
		decimalPlaces: 5,
		disableUnit: true,
	})

	const stakeButtonTitle = isConnected ? (stakedAmount ? 'Manage' : 'Stake') : 'Connect wallet to swap'

	function handleManageButtonClick() {
		setIsManageModalOpen(true)
	}

	function handleGoBackButtonClick() {
		stakingDispatch({ type: 'SET_SELECTED_VAULT', payload: null })
	}

	function InfoCards() {
		return (
			<div className={classNames.cardsContainer}>
				{stakedAmount ? <InfoCard title={'Staked'} value={stakedAmount} secondaryValue={stakingState.selectedVault.symbol} /> : null}
				{stakingState.selectedVault?.stakedAmountUsd ? <InfoCard title={'Amount usd'} value={numberToFormatString(stakingState.selectedVault?.stakedAmountUsd, 4)} /> : null}
				{stakedAmount ? <InfoCard title={'Pool share'} value={stakedAmount} /> : null}
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
										isDisabled={!stakingState.address}
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
				<Button leftIcon={<IconArrowsUpDown size={16} color="white" />} variant="primary" onClick={handleManageButtonClick} isDisabled={!stakingState.address}>
					{stakeButtonTitle}
				</Button>
			) : null}
			<ManageModal isOpen={isManageModalOpen} setIsOpen={setIsManageModalOpen} stakingState={stakingState} />
		</>
	)
}
