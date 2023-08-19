import { FC } from 'react'
import classNames from './StakingScreen.module.pcss'
import { StackingOpportunitiesCard } from '../../cards/StackingOpportunitesCard/StackingOpportunitiesCard'

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
      <StackingOpportunitiesCard />
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
