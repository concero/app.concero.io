import { FC, useEffect } from 'react'
import { approve } from 'wido'
import { useAccount } from 'wagmi'
import { useStakingReducer } from './stakingReducer/stakingReducer'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import classNames from './StakingScreen.module.pcss'
import { StakingOpportunitiesCard } from '../../cards/StakingOpportunitesCard/StakingOpportunitiesCard'
import { StakingHeaderCard } from '../../cards/StakingHeaderCard/StakingHeaderCard'
import { StakingChartCard } from '../../cards/StakingChartCard/StakingChartCard'
import { StakingHighlightsCard } from '../../cards/StakingHighlightsCard/StakingHighlightsCard'
import { TokensCard } from '../../cards/TokensCard/TokensCard'
import { RewardsCard } from '../../cards/RewardsCard/RewardsCard'
import { PredictionCard } from '../../cards/PredictionCard/PredictionCard'
import { RatioCard } from '../../cards/RatioCard/RatioCard'
import { DetailsCard } from '../../cards/DetailsCard/DetailsCard'

export const StakingScreen: FC = () => {
  const { address } = useAccount()
  const [stakingState, dispatch] = useStakingReducer()
  const isDesktop = useMediaQuery('mobile') // Adjust this as per your specific media query needs

  useEffect(() => {
    if (address) dispatch({ type: 'SET_ADDRESS', payload: address })
    // getApproveData()
  }, [])

  async function getApproveData() {
    const { data, to } = await approve({
      chainId: 1,
      fromToken: '0x6b175474e89094c44da98b954eedeac495271d0f',
      toToken: '0x6b175474e89094c44da98b954eedeac495271d0f',
      amount: '1000000000000000000',
    })
  }

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

  const desktopLayout = (
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

  return <div style={{ width: '100%', height: '100%' }}>{isDesktop ? desktopLayout : mobileLayout}</div>
}
