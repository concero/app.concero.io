import { type Dispatch, memo, type UIEvent, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import classNames from './EarnOpportunitiesCard.module.pcss'
import { FilteredTags } from './FilteredTags/FilteredTags'
import { EarnCard } from '../EarnCard/EarnCard'
import { type EarnAction, type EarnState, type Vault } from '../../screens/EarnScreen/earnReducer/types'
import { getMoreVaults, getVaults } from './getVaults'
import { CardHeader } from '../CardHeader/CardHeader'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { useTranslation } from 'react-i18next'
import { trackEvent } from '../../../hooks/useTracking'
import { action, category } from '../../../constants/tracking'

interface EarnOpportunitiesProps {
	earnState: EarnState
	earnDispatch: Dispatch<EarnAction>
}

const MemoizedEarnCard = memo(EarnCard)

export function EarnOpportunitiesCard({ earnState, earnDispatch }: EarnOpportunitiesProps) {
	const isIpad = useMediaQuery('ipad')
	const { selectedVault, vaults } = earnState
	const { address } = useAccount()
	const [offset, setOffset] = useState(0)
	const limit = 15
	const { t } = useTranslation()

	function handleSelect(vault: Vault) {
		earnDispatch({ type: 'SET_SELECTED_VAULT', payload: vault })
		trackEvent({ category: category.StakingScreen, action: action.Click, label: 'Staking opportunities select vault' })
	}

	function handleEndReached() {
		const newOffset = offset + limit
		setOffset(newOffset)
		getMoreVaults(earnDispatch, address, earnState, newOffset, limit)
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
		getVaults(earnDispatch, address as string, earnState, 0, limit, isIpad)
	}, [earnState.filter, earnState.balances])

	return (
		<div className={`card ${classNames.container}`}>
			<CardHeader title={t('stakingOpportunitiesCard.title')} isLoading={earnState.loading}>
				<FilteredTags earnDispatch={earnDispatch} earnState={earnState} />
			</CardHeader>
			<div className={classNames.stakingCardsContainer} onScroll={handleScroll}>
				{vaults?.map((vault: Vault) => (
					<MemoizedEarnCard key={vault._id} isSelected={selectedVault?._id === vault._id} vault={vault} onClick={handleSelect} />
				))}
			</div>
		</div>
	)
}
