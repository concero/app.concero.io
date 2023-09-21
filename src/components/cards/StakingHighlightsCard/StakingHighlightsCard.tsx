import { FC } from 'react'
import classNames from './StakingHighlightsCard.module.pcss'
import { Highlight } from '../../tags/Highlight/Highlight'
import { StakingState } from '../../screens/StakingScreen/stakingReducer/types'
import { formatNumber } from '../../../utils/formatting'

interface StakingHighlightsCardProps {
  stakingState: StakingState
}

export const StakingHighlightsCard: FC<StakingHighlightsCardProps> = ({ stakingState }) => {
  const renderHighlights = (vault) => {
    const highlights = []
    if (vault.tvlUsd) {
      highlights.push(
        <Highlight
          key="tvl"
          title="TVL"
          value={`$${formatNumber(stakingState?.selectedVault?.tvlUsd)}`}
          tag={vault.tvlPct30D ? formatNumber(vault.tvlPct30D) : null}
        />,
      )
    }

    if (vault.apy) {
      highlights.push(
        <Highlight
          key="apy"
          title="APY"
          value={`${formatNumber(vault.apy, { decimalPlaces: 2 })}%`}
          tag={vault.apyPct30D ? formatNumber(vault.apyPct30D, { decimalPlaces: 2 }) : null}
        />,
      )
    }

    if (vault.apyMean30d) {
      highlights.push(
        <Highlight
          key="apyMean30d"
          title="Mean APY (30d)"
          value={`${formatNumber(vault.apyMean30d, { decimalPlaces: 2 })}%`}
          tag={vault.apyMean30dPct30D ? formatNumber(vault.apyMean30dPct30D) : null}
        />,
      )
    }
    return highlights
  }

  return (
    <div className={classNames.container}>
      <h5 className="cardHeaderTitle">Vault Details</h5>
      {renderHighlights(stakingState.selectedVault)}
    </div>
  )
}
