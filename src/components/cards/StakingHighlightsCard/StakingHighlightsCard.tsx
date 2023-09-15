import { FC } from 'react'
import classNames from './StakingHighlightsCard.module.pcss'
import { Highlight } from '../../tags/Highlight/Highlight'
import { StakingState } from '../../screens/StakingScreen/stakingReducer/types'
import { numberToFormatString } from '../../../utils/formatting'

interface StakingHighlightsCardProps {
  stakingState: StakingState
}

export const StakingHighlightsCard: FC<StakingHighlightsCardProps> = ({ stakingState }) => {
  const tvl = {
    title: 'TVL',
    value: `$${stakingState?.selectedVault?.tvlUsd}`,
    last_24h: numberToFormatString(stakingState.selectedVault?.apyPct30D, 2) ?? null,
  }

  return (
    <div className={classNames.container}>
      <h5 className={'cardHeaderTitle'}>Vault Details</h5>
      <div className={`card ${classNames.innerContainer}`}>
        <Highlight size={'sm'} item={tvl} />
      </div>
    </div>
  )
}
