import { Dispatch, FC } from 'react'
import classNames from './StakingScreen.module.pcss'
import { StakingOpportunitiesCard } from '../../cards/StakingOpportunitesCard/StakingOpportunitiesCard'
import { StakingHeaderCard } from '../../cards/StakingHeaderCard/StakingHeaderCard'
import { StakingChartCard } from '../../cards/StakingChartCard/StakingChartCard'
import { StakingHighlightsCard } from '../../cards/StakingHighlightsCard/StakingHighlightsCard'
import { TokensCard } from '../../cards/TokensCard/TokensCard'
import { RewardsCard } from '../../cards/RewardsCard/RewardsCard'
import { PredictionCard } from '../../cards/PredictionCard/PredictionCard'
import { StakingState } from './stakingReducer/types'

interface DesktopLayoutProps {
  stakingState: StakingState
  dispatch: Dispatch<any>
}

export const DesktopLayout: FC<DesktopLayoutProps> = ({ stakingState, dispatch }) => {
  return (
    <div className={classNames.container}>
      <StakingOpportunitiesCard stakingState={stakingState} dispatch={dispatch} />
      {stakingState.selectedVault ? (
        <div className={classNames.stacksContainer}>
          <div className={classNames.mainCardStack}>
            <StakingHeaderCard stakingState={stakingState} />
            <StakingChartCard stakingState={stakingState} />
          </div>
          <div className={`card ${classNames.secondaryCardStack}`}>
            <StakingHighlightsCard stakingState={stakingState} />
            <TokensCard stakingState={stakingState} />
            <RewardsCard stakingState={stakingState} />
            <PredictionCard stakingState={stakingState} />
          </div>
        </div>
      ) : null}
    </div>
  )
}
