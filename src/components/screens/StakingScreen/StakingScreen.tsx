import { FC } from 'react'
import classNames from './StakingScreen.module.pcss'
import { StakingOpportunitiesCard } from '../../cards/StakingOpportunitesCard/StakingOpportunitiesCard'

export interface StakingScreenProps {}

export const SelectedOpportunityCard = () => {
  return (
    <div
      className={'card'}
      style={{
        flex: 1,
        minWidth: 400,
      }}
    ></div>
  )
}

export const StakingScreen: FC<StakingScreenProps> = () => {
  return (
    <div className={classNames.container}>
      <StakingOpportunitiesCard />
      <div className={classNames.mainCardStack}>
        <SelectedOpportunityCard />
        {/* <Chart/> */}
      </div>
      <div
        className={classNames.secondaryCardStack}
        style={{
          width: 300,
        }}
      ></div>
    </div>
  )
}
