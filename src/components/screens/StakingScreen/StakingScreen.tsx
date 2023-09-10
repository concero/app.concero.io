import { FC } from 'react'
import classNames from './StakingScreen.module.pcss'
import { StakingOpportunitiesCard } from '../../cards/StakingOpportunitesCard/StakingOpportunitiesCard'
import { StakingHeaderCard } from '../../cards/StakingHeaderCard/StakingHeaderCard'
import { StakingChartCard } from '../../cards/StakingChartCard/StakingChartCard'
import { StakingHighlightsCard } from '../../cards/StakingHighlightsCard/StakingHighlightsCard'
import { RatioCard } from '../../cards/RatioCard/RatioCard'
import { DetailsCard } from '../../cards/DetailsCard/DetailsCard'
import { useStakingReducer } from './stakingReducer/stakingReducer'
import { useMediaQuery } from '../../../hooks/useMediaQuery'

export const StakingScreen: FC = () => {
  const [{ selectedVault, vaults, protocols, filter }, dispatch] = useStakingReducer()
  const isDesktop = useMediaQuery('mobile') // Adjust this as per your specific media query needs

  const desktopLayout = (
    <div className={classNames.container}>
      <StakingOpportunitiesCard vaults={vaults} selectedVault={selectedVault} protocols={protocols} dispatch={dispatch} filter={filter} />
      {selectedVault ? (
        <div className={classNames.stacksContainer}>
          <div className={classNames.mainCardStack}>
            <StakingHeaderCard vault={selectedVault} protocols={protocols} />
            <StakingChartCard selectedVault={selectedVault} />
          </div>
          <div className={classNames.secondaryCardStack}>
            <StakingHighlightsCard />
            <RatioCard />
            <DetailsCard />
          </div>
        </div>
      ) : null}
    </div>
  )

  const mobileLayout = (
    <div className={classNames.container}>
      <StakingOpportunitiesCard vaults={vaults} selectedVault={selectedVault} protocols={protocols} dispatch={dispatch} filter={filter} />
      {selectedVault ? (
        <div className={classNames.mainCardStack}>
          <StakingChartCard selectedVault={selectedVault} />
          <StakingHighlightsCard />
          <RatioCard />
          <DetailsCard />
        </div>
      ) : null}
    </div>
  )

  return <div style={{ width: '100%', height: '100%' }}>{isDesktop ? desktopLayout : mobileLayout}</div>
}
