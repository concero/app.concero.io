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
// import { DetailsCard } from '../../cards/DetailsCard/DetailsCard'
import { withErrorBoundary } from '../../wrappers/WithErrorBoundary'
import { StakingDetailsCard } from '../../cards/StakingDetailsCard/StakingDetailsCard'
import { getUserBalancesSortedByChain } from '../../../api/wido/getUserBalancesSortedByChain'

const Header = memo(withErrorBoundary(StakingHeaderCard))
const Highlights = memo(withErrorBoundary(StakingHighlightsCard))
const Ratio = memo(withErrorBoundary(RatioCard))
const Details = memo(withErrorBoundary(StakingDetailsCard))

export const StakingScreen: FC = () => {
  const [stakingState, dispatch] = useStakingReducer()
  const { address } = useAccount()
  const isDesktop = useMediaQuery('mobile') // Adjust this as per your specific media query needs
  const Chart = memo(withErrorBoundary(StakingChartCard))

  useEffect(() => {
    dispatch({ type: 'SET_ADDRESS', payload: address })
    getUserBalancesSortedByChain(address).then((balances) => {
      dispatch({ type: 'SET_BALANCES', payload: balances })
    })
  }, [address])

  const mobileLayout = (
    <div className={classNames.container}>
      <StakingOpportunitiesCard stakingState={stakingState} dispatch={dispatch} />
      {stakingState.selectedVault ? (
        <div className={classNames.mainCardStack}>
          <Chart stakingState={stakingState} />
          <Highlights stakingState={stakingState} />
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
          <Header stakingState={stakingState} />
          <Chart selectedVault={stakingState.selectedVault} />
        </div>
        <Details stakingState={stakingState} />
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
