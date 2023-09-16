import { FC } from 'react'
import classNames from './StakingHeaderCard.module.pcss'
import { Avatar } from '../../tags/Avatar/Avatar'
import { Vault } from '../../screens/StakingScreen/stakingReducer/types'
import { capitalize } from '../../../utils/formatting'
import { Button } from '../../buttons/Button/Button'
import { IconArrowsUpDown } from '@tabler/icons-react'
import { InfoCard } from './InfoCard/InfoCard'

interface StakingHeaderCardProps {
  stakingState: { selectedVault: Vault }
}

export const StakingHeaderCard: FC<StakingHeaderCardProps> = ({ stakingState }) => {
  const { selectedVault } = stakingState

  const stake = {
    title: 'Staked',
    value: '$1500',
    secondaryValue: '0.94',
  }

  const earned = {
    title: 'Earned',
    value: '$1500',
    last_24h: '0.94%',
  }

  const poolShare = {
    title: 'Pool share',
    value: '0.94%',
    last_24h: '0.94%',
  }

  return (
    <div className={`card ${classNames.container}`}>
      <div className={classNames.headerContainer}>
        <div className={classNames.sideContainer}>
          <Avatar src={selectedVault.logoURI} />
          <div>
            <h5 className={classNames.symbolTitle}>{selectedVault.symbol}</h5>
            <p className={`body1 ${classNames.protocolTitle}`}>{capitalize(selectedVault?.protocolName ?? '')}</p>
          </div>
        </div>
        <div className={classNames.sideContainer}>
          <Button leftIcon={<IconArrowsUpDown size={16} color="white" />} variant={'primary'}>
            Manage
          </Button>
        </div>
      </div>
      <div className={classNames.cardsContainer}>
        <InfoCard item={stake} />
        <InfoCard item={earned} />
        <InfoCard item={poolShare} />
      </div>
    </div>
  )
}
