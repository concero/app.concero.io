import { FC, useContext, useEffect } from 'react'
import classNames from './StakingScreen.module.pcss'
import { StakingOpportunitiesCard } from '../../cards/StakingOpportunitesCard/StakingOpportunitiesCard'
import { StakingHeaderCard } from '../../cards/StakingHeaderCard/StakingHeaderCard'
import { StakingChartCard } from '../../cards/StakingChartCard/StakingChartCard'
import { StakingHighlightsCard } from '../../cards/StakingHighlightsCard/StakingHighlightsCard'
import { RatioCard } from '../../cards/RatioCard/RatioCard'
import { DetailsCard } from '../../cards/DetailsCard/DetailsCard'
import { useStakingReducer } from './stakingReducer/stakingReducer'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { DataContext } from '../../../hooks/DataContext/DataContext'
import { useAccount } from 'wagmi'
import { populateBalances, populateChains } from './populateFunctions'

export const StakingScreen: FC = () => {
  const { getChains } = useContext(DataContext)
  const { address } = useAccount()
  const [stakingState, dispatch] = useStakingReducer()
  const isDesktop = useMediaQuery('mobile') // Adjust this as per your specific media query needs

  useEffect(() => {
    populateChains(getChains, dispatch)
    populateBalances(address, stakingState, dispatch)
  }, [])

  const desktopLayout = (
    <div className={classNames.container}>
      <StakingOpportunitiesCard stakingState={stakingState} dispatch={dispatch} />
      {stakingState.selectedVault ? (
        <div className={classNames.stacksContainer}>
          <div className={classNames.mainCardStack}>
            <StakingHeaderCard stakingState={stakingState} />
            <StakingChartCard stakingState={stakingState} />
          </div>
          <div className={classNames.secondaryCardStack}>
            <StakingHighlightsCard stakingState={stakingState} />
            <RatioCard />
            <DetailsCard />
          </div>
        </div>
      ) : null}
    </div>
  )

  const mobileLayout = (
    <div className={classNames.container}>
      <StakingOpportunitiesCard stakingState={stakingState} dispatch={dispatch} />
      {stakingState.selectedVault ? (
        <div className={classNames.mainCardStack}>
          <StakingChartCard stakingState={stakingState} />
          <StakingHighlightsCard stakingState={stakingState} />
          <RatioCard />
          <DetailsCard />
        </div>
      ) : null}
    </div>
  )

  return <div style={{ width: '100%', height: '100%' }}>{isDesktop ? desktopLayout : mobileLayout}</div>
}
