import { FC } from 'react'
import classNames from './StakingHeaderCard.module.pcss'
import { Avatar } from '../../tags/Avatar/Avatar'
import { Tag } from '../../tags/Tag/Tag'
import { Protocol, Vault } from '../../screens/StakingScreen/stakingReducer/types'
import { capitalize } from '../../../utils/formatting'

interface StakingHeaderCardProps {
  stakingState: {
    selectedVault: Vault
    protocols: Protocol
  }
}

export const StakingHeaderCard: FC<StakingHeaderCardProps> = ({ stakingState }) => {
  const { selectedVault, protocols } = stakingState
  const pairSymbol = `${selectedVault.symbol}`

  return (
    <div className={`card ${classNames.container}`}>
      <div className={classNames.sideContainer}>
        <Avatar src={protocols[selectedVault.project]?.logo_url} />
        <div>
          <h5>{pairSymbol}</h5>
          <p className={'body1'}>{capitalize(selectedVault.project ?? '')}</p>
        </div>
      </div>
      <div className={classNames.sideContainer}>
        <Tag color="main">
          <p className="tagBody">Your position</p>
        </Tag>
        <Tag color="main">
          <p className="tagBody">Best</p>
        </Tag>
        <Tag color={'green'} title={'Insurable'} />
      </div>
    </div>
  )
}
