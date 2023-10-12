import { FC, memo, useEffect, useMemo } from 'react'
import { useAccount } from 'wagmi'
import { useStakingReducer } from './stakingReducer/stakingReducer'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import classNames from './StakingScreen.module.pcss'
import { StakingOpportunitiesCard } from '../../cards/StakingOpportunitesCard/StakingOpportunitiesCard'
import { StakingHeaderCard } from '../../cards/StakingHeaderCard/StakingHeaderCard'
import { StakingChartCard } from '../../cards/StakingChartCard/StakingChartCard'
import { withErrorBoundary } from '../../wrappers/WithErrorBoundary'
import { StakingDetailsCard } from '../../cards/StakingDetailsCard/StakingDetailsCard'
import { getUserBalancesSortedByChain } from '../../../api/enso/getUserBalancesSortedByChain'

const Header = memo(withErrorBoundary(StakingHeaderCard))
// const Highlights = memo(withErrorBoundary(StakingHighlightsCard))
// const Ratio = memo(withErrorBoundary(RatioCard))
const Details = memo(withErrorBoundary(StakingDetailsCard))

export const StakingScreen: FC = () => {
	const [stakingState, stakingDispatch] = useStakingReducer()
	const { address } = useAccount()
	const isMobile = useMediaQuery('mobile')
	const isIpad = useMediaQuery('ipad')
	const Chart = memo(withErrorBoundary(StakingChartCard))

	useEffect(() => {
		stakingDispatch({ type: 'SET_ADDRESS', payload: address })
		getUserBalancesSortedByChain(address).then(balances => {
			stakingDispatch({ type: 'SET_BALANCES', payload: balances })
		})
	}, [address])

	const mobileVaultDetails = (
		<div className={classNames.stacksContainer}>
			<div className={classNames.mainCardStack}>
				<Header stakingState={stakingState} stakingDispatch={stakingDispatch} />
				<Chart selectedVault={stakingState.selectedVault} />
			</div>
			<Details stakingState={stakingState} />
		</div>
	)

	const mobileLayout = (
		<div className={classNames.container}>
			{stakingState.selectedVault ? mobileVaultDetails : <StakingOpportunitiesCard stakingState={stakingState} stakingDispatch={stakingDispatch} />}
		</div>
	)

	const ipadVaultDetails = (
		<div className={classNames.stacksContainer}>
			<div className={classNames.mainCardStack}>
				<Header stakingState={stakingState} stakingDispatch={stakingDispatch} />
			</div>
			<Details stakingState={stakingState} />
		</div>
	)

	const ipadLayout = (
		<div className={classNames.container}>
			{stakingState.selectedVault ? ipadVaultDetails : <StakingOpportunitiesCard stakingState={stakingState} stakingDispatch={stakingDispatch} />}
			{stakingState.selectedVault ? <Chart selectedVault={stakingState.selectedVault} /> : null}
		</div>
	)

	const vaultDetails = useMemo(() => {
		if (!stakingState.selectedVault) return null
		return (
			<div className={classNames.stacksContainer}>
				<div className={classNames.mainCardStack}>
					<Header stakingState={stakingState} stakingDispatch={stakingDispatch} />
					<Chart selectedVault={stakingState.selectedVault} />
				</div>
				<Details stakingState={stakingState} />
			</div>
		)
	}, [stakingState.selectedVault, stakingState.address])

	const desktopLayout = (
		<div className={classNames.container}>
			<StakingOpportunitiesCard stakingState={stakingState} stakingDispatch={stakingDispatch} />
			{vaultDetails}
		</div>
	)

	return <div style={{ width: '100%', height: '100%' }}>{isMobile ? mobileLayout : isIpad ? ipadLayout : desktopLayout}</div>
}
