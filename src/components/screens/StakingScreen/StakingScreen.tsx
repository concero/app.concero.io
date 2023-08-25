import classNames from './StakingScreen.module.pcss'
import { StakingOpportunitiesCard } from '../../cards/StakingOpportunitesCard/StakingOpportunitiesCard'
import { StakingHeaderCard } from '../../cards/StakingHeaderCard/StakingHeaderCard'
import { StakingChartCard } from '../../cards/StakingChartCard/StakingChartCard'
import { StakingHighlightsCard } from '../../cards/StakingHighlightsCard/StakingHighlightsCard'
import { RatioCard } from '../../cards/RatioCard/RatioCard'
import { DetailsCard } from '../../cards/DetailsCard/DetailsCard'
import { useStakingReducer } from './stakingReducer/stakingReducer'

export const StakingScreen = () => {
  const [{ selectedVault, vaults, protocols }, dispatch] = useStakingReducer()

  return (
    <div className={classNames.container}>
      <StakingOpportunitiesCard vaults={vaults} selectedVault={selectedVault} protocols={protocols} />
      <div className={classNames.stacksContainer}>
        <div className={classNames.mainCardStack}>
          <StakingHeaderCard vault={selectedVault} protocols={protocols} />
          <StakingChartCard />
        </div>
        <div className={classNames.secondaryCardStack}>
          <StakingHighlightsCard />
          <RatioCard />
          <DetailsCard />
        </div>
      </div>
    </div>
  )
}
