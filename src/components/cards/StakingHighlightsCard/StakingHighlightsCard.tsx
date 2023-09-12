import classNames from './StakingHighlightsCard.module.pcss'
import { Highlight } from '../../tags/Highlight/Highlight'

export const StakingHighlightsCard = ({ stakingState }) => {
  const apy = {
    title: 'APY',
    value: `${stakingState?.selectedVault?.apy}%`,
    last_24h: '0.55',
  }

  const tvl = {
    title: 'TVL',
    value: `$${stakingState?.selectedVault?.tvlUsd}`,
    last_24h: '5.54',
  }

  return (
    <div className={`card ${classNames.container}`}>
      <h5 className={'cardHeaderTitle'}>Highlights</h5>
      <div className={classNames.higlitsContainer}>
        <Highlight size={'sm'} item={apy} />
        <Highlight size={'sm'} item={tvl} />
      </div>
    </div>
  )
}
