import { FC, memo, useEffect, useMemo } from 'react'
import { useAccount } from 'wagmi'
import { useEarnReducer } from './earnReducer/stakingScreenReducer'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import classNames from './EarnScreen.module.pcss'
import { EarnOpportunitiesCard } from '../../cards/EarnOpportunitesCard/EarnOpportunitiesCard'
import { EarnHeaderCard } from '../../cards/EarnHeaderCard/EarnHeaderCard'
import { EarnChartCard } from '../../cards/EarnChartCard/EarnChartCard'
import { withErrorBoundary } from '../../wrappers/WithErrorBoundary'
import { EarnDetailsCard } from '../../cards/EarnDetailsCard/EarnDetailsCard'

const Header = memo(withErrorBoundary(EarnHeaderCard))
// const Highlights = memo(withErrorBoundary(EarnHighlightsCard))
// const Ratio = memo(withErrorBoundary(RatioCard))
const Details = memo(withErrorBoundary(EarnDetailsCard))

export const EarnScreen: FC = () => {
	const [earnState, earnDispatch] = useEarnReducer()
	const { address } = useAccount()
	const isMobile = useMediaQuery('mobile')
	const isIpad = useMediaQuery('ipad')
	const Chart = memo(withErrorBoundary(EarnChartCard))

	useEffect(() => {
		earnDispatch({ type: 'SET_ADDRESS', payload: address })
	}, [address])

	const mobileVaultDetails = (
		<div className={classNames.stacksContainer}>
			<div className={classNames.mainCardStack}>
				<Header earnState={earnState} earnDispatch={earnDispatch} />
				<Chart selectedVault={earnState.selectedVault} />
			</div>
			<Details earnState={earnState} />
		</div>
	)

	const mobileLayout = (
		<div className={classNames.container}>{earnState.selectedVault ? mobileVaultDetails : <EarnOpportunitiesCard earnState={earnState} earnDispatch={earnDispatch} />}</div>
	)

	const ipadVaultDetails = (
		<div className={classNames.stacksContainer}>
			<div className={classNames.mainCardStack}>
				<Header earnState={earnState} earnDispatch={earnDispatch} />
			</div>
			<Details earnState={earnState} />
		</div>
	)

	const ipadLayout = (
		<div className={classNames.container}>
			{earnState.selectedVault ? ipadVaultDetails : <EarnOpportunitiesCard earnState={earnState} earnDispatch={earnDispatch} />}
			{earnState.selectedVault ? <Chart selectedVault={earnState.selectedVault} /> : null}
		</div>
	)

	const vaultDetails = useMemo(() => {
		if (!earnState.selectedVault) return null
		return (
			<div className={classNames.stacksContainer}>
				<div className={classNames.mainCardStack}>
					<Header earnState={earnState} earnDispatch={earnDispatch} />
					<Chart selectedVault={earnState.selectedVault} />
				</div>
				<Details earnState={earnState} />
			</div>
		)
	}, [earnState.selectedVault, earnState.address])

	const desktopLayout = (
		<div className={classNames.container}>
			<EarnOpportunitiesCard earnState={earnState} earnDispatch={earnDispatch} />
			{vaultDetails}
		</div>
	)

	return <div style={{ width: '100%', height: '100%' }}>{isMobile ? mobileLayout : isIpad ? ipadLayout : desktopLayout}</div>
}
