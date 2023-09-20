import { FC, memo, useEffect, useMemo } from 'react'
import { useAccount } from 'wagmi'
import { useStakingReducer } from './stakingReducer/stakingReducer'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import classNames from './StakingScreen.module.pcss'
import { StakingOpportunitiesCard } from '../../cards/StakingOpportunitesCard/StakingOpportunitiesCard'
import { StakingHeaderCard } from '../../cards/StakingHeaderCard/StakingHeaderCard'
import { StakingChartCard } from '../../cards/StakingChartCard/StakingChartCard'
import { StakingHighlightsCard } from '../../cards/StakingHighlightsCard/StakingHighlightsCard'
import { RatioCard } from '../../cards/RatioCard/RatioCard'
import { DetailsCard } from '../../cards/DetailsCard/DetailsCard'
import { withErrorBoundary } from '../../wrappers/WithErrorBoundary'
import { StakingDetailsCard } from '../../cards/StakingDetailsCard/StakingDetailsCard'

export const StakingScreen: FC = () => {
  const [stakingState, dispatch] = useStakingReducer()
  const { address } = useAccount()
  const isDesktop = useMediaQuery('mobile') // Adjust this as per your specific media query needs
  // const StakingOpportunities = withErrorBoundary(StakingOpportunitiesCard)
  const StakingHeader = memo(withErrorBoundary(StakingHeaderCard))
  const StakingChart = memo(withErrorBoundary(StakingChartCard))
  const StakingHighlights = memo(withErrorBoundary(StakingHighlightsCard))
  const Ratio = memo(withErrorBoundary(RatioCard))
  const Details = memo(withErrorBoundary(DetailsCard))

  useEffect(() => {
    dispatch({ type: 'SET_ADDRESS', payload: address })
  }, [address])

  const mobileLayout = (
    <div className={classNames.container}>
      <StakingOpportunitiesCard stakingState={stakingState} dispatch={dispatch} />
      {stakingState.selectedVault ? (
        <div className={classNames.mainCardStack}>
          <StakingChart stakingState={stakingState} />
          <StakingHighlights stakingState={stakingState} />
          <Ratio />
          <Details />
        </div>
      ) : null}
    </div>
  )

  const vaultDetails = useMemo(() => {
    if (!stakingState.selectedVault) return null
    return (
      <div className={classNames.stacksContainer}>
        <div className={classNames.mainCardStack}>
          <StakingHeader stakingState={stakingState} />
          <StakingChart selectedVault={stakingState.selectedVault} />
        </div>
        <StakingDetailsCard stakingState={stakingState} />
      </div>
    )
  }, [stakingState.selectedVault])

  const desktopLayout = (
    <div className={classNames.container}>
      <StakingOpportunitiesCard stakingState={stakingState} dispatch={dispatch} />
      {vaultDetails}
    </div>
  )

  return <div style={{ width: '100%', height: '100%' }}>{isDesktop ? desktopLayout : mobileLayout}</div>
}
