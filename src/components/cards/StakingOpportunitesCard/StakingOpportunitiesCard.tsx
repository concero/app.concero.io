import { Dispatch, memo, UIEvent, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import classNames from './StakingOpportunitiesCard.module.pcss'
import { FilteredTags } from './FilteredTags/FilteredTags'
import { StakingCard } from '../StakingCard/StakingCard'
import { StakingAction, StakingState, Vault } from '../../screens/StakingScreen/stakingReducer/types'
import { getMoreVaults, getVaults } from './getVaults'
import { CardHeader } from '../CardHeader/CardHeader'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { useTranslation } from 'react-i18next'
import { trackEvent } from '../../../hooks/useTracking'
import { action, category } from '../../../constants/tracking'

interface StakingOpportunitiesProps {
	stakingState: StakingState
	stakingDispatch: Dispatch<StakingAction>
}

const MemoizedStakingCard = memo(StakingCard)

export function StakingOpportunitiesCard({ stakingState, stakingDispatch }: StakingOpportunitiesProps) {
	const isIpad = useMediaQuery('ipad')
	const { selectedVault, vaults } = stakingState
	const { address } = useAccount()
	const [offset, setOffset] = useState(0)
	const limit = 15
	const { t } = useTranslation()

	function handleSelect(vault: Vault) {
		stakingDispatch({ type: 'SET_SELECTED_VAULT', payload: vault })
		trackEvent({ category: category.StakingScreen, action: action.Click, label: 'Staking opportunities select vault' })
	}

	function handleEndReached() {
		const newOffset = offset + limit
		setOffset(newOffset)
		getMoreVaults(stakingDispatch, address, stakingState, newOffset, limit)
		trackEvent({ category: category.StakingScreen, action: action.ScrollToEnd, label: 'Staking opportunities onEndReached' })
	}

	function handleScroll(e: UIEvent<HTMLDivElement>) {
		const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
		const scrollTolerance = 10

		if (scrollHeight - scrollTop <= clientHeight + scrollTolerance) {
			handleEndReached()
		}
	}

	useEffect(() => {
		setOffset(0)
		getVaults(stakingDispatch, address as string, stakingState, 0, limit, isIpad)
	}, [stakingState.filter, stakingState.balances])

	return (
		<div className={`card ${classNames.container}`}>
			<CardHeader title={t('stakingOpportunitiesCard.title')} isLoading={stakingState.loading}>
				<FilteredTags stakingDispatch={stakingDispatch} stakingState={stakingState} />
			</CardHeader>
			<div className={classNames.stakingCardsContainer} onScroll={handleScroll}>
				{vaults?.map((vault: Vault) => (
					<MemoizedStakingCard key={vault._id} isSelected={selectedVault?._id === vault._id} vault={vault} onClick={handleSelect} />
				))}
			</div>
		</div>
	)
}
