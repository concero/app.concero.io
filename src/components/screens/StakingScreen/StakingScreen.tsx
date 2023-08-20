import { FC } from 'react'
import classNames from './StakingScreen.module.pcss'
import { StakingOpportunitiesCard } from '../../cards/StakingOpportunitesCard/StakingOpportunitiesCard'
import { StakingHeaderCard } from '../../cards/StakingHeaderCard/StakingHeaderCard'
import { StakingChartCard } from '../../cards/StakingChartCard/StakingChartCard'

export interface StakingScreenProps {}

const route = {
  id: '1',
  interest_rate: '5.5%',
  insured: false,
  execution_duration_sec: '61',
  dex: {
    name: 'uniswap',
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/exchanges/oneinch.png',
  },
  from: {
    chain: {
      id: '1',
      name: 'Ethereum',
    },
    token: {
      symbol: 'ETH',
      address: '0x0000000',
    },
  },
  to: {
    chain: {
      id: '1',
      name: 'Ethereum',
    },
    token: {
      symbol: 'MATIC',
      address: '0x0000000',
    },
  },
}

export const StakingScreen: FC<StakingScreenProps> = () => {
  return (
    <div className={classNames.container}>
      <StakingOpportunitiesCard />
      <div className={classNames.mainCardStack}>
        <StakingHeaderCard route={route} />
        <StakingChartCard />
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
