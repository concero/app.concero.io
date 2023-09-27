import { Dispatch, FC, useState } from 'react'
import { IconArrowsUpDown, IconChevronLeft } from '@tabler/icons-react'
import classNames from './StakingHeaderCard.module.pcss'
import { Avatar } from '../../tags/Avatar/Avatar'
import { StakingAction, StakingState } from '../../screens/StakingScreen/stakingReducer/types'
import { capitalize, formatNumber } from '../../../utils/formatting'
import { Button } from '../../buttons/Button/Button'
import { InfoCard } from './InfoCard/InfoCard'
import { ManageModal } from './ManageModal/ManageModal'
import { useMediaQuery } from '../../../hooks/useMediaQuery'

interface StakingHeaderCardProps {
	stakingState: StakingState
	stakingDispatch: Dispatch<StakingAction>
}

export const StakingHeaderCard: FC<StakingHeaderCardProps> = ({ stakingState, stakingDispatch }) => {
	const isDesktop = useMediaQuery('mobile')
	const [isManageModalOpen, setIsManageModalOpen] = useState(false)
	const { selectedVault } = stakingState

	const stakedAmount = formatNumber(selectedVault.stakedAmount, {
		decimals: selectedVault.decimals,
		decimalPlaces: 5,
		disableUnit: true,
	})

	function handleManageButtonClick() {
		setIsManageModalOpen(true)
	}

	function handleGoBackbuttonClick() {
		stakingDispatch({ type: 'SET_SELECTED_VAULT', payload: null })
	}

	return (
		<>
			<div className={classNames.wrapper}>
				{!isDesktop ? <Button variant={'subtle'} leftIcon={<IconChevronLeft />} className={stakedAmount ? classNames.staked : ''} onClick={handleGoBackbuttonClick} /> : null}
				<div className={classNames.innerContainer}>
					<div className={`card ${classNames.container} ${stakedAmount ? classNames.staked : ''}`}>
						<div className={classNames.headerContainer}>
							<div className={classNames.sideContainer}>
								<Avatar src={selectedVault.protocol?.logoURI} />
								<div>
									<h5 className={classNames.symbolTitle}>{selectedVault.widoSymbol}</h5>
									<p className={`body1 ${classNames.protocolTitle}`}>{capitalize(selectedVault?.protocol?.name ?? '')}</p>
								</div>
							</div>
							{isDesktop ? (
								<div className={classNames.sideContainer}>
									<Button leftIcon={<IconArrowsUpDown size={16} color="white" />} variant="primary" onClick={handleManageButtonClick} className={classNames.stakeButton}>
										{stakedAmount ? 'Manage' : 'Stake'}
									</Button>
								</div>
							) : null}
						</div>
						{isDesktop && stakedAmount ? (
							<div className={classNames.cardsContainer}>
								<InfoCard title={'Staked'} value={stakedAmount} secondaryValue={stakingState.selectedVault.symbol} />
								<InfoCard title={'Earned'} value={stakedAmount} />
								<InfoCard title={'Pool share'} value={stakedAmount} />
							</div>
						) : null}
					</div>
				</div>
			</div>
			{!isDesktop && stakedAmount ? (
				<div className={classNames.cardsContainer}>
					<InfoCard title={'Staked'} value={stakedAmount} secondaryValue={stakingState.selectedVault.symbol} />
					<InfoCard title={'Earned'} value={stakedAmount} />
					<InfoCard title={'Pool share'} value={stakedAmount} />
				</div>
			) : null}
			{!isDesktop ? (
				<Button leftIcon={<IconArrowsUpDown size={16} color="white" />} variant="primary" onClick={handleManageButtonClick}>
					{stakedAmount ? 'Manage' : 'Stake'}
				</Button>
			) : null}
			<ManageModal isOpen={isManageModalOpen} setIsOpen={setIsManageModalOpen} stakingState={stakingState} />
		</>
	)
}
