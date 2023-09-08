import { FC } from 'react'
import classNames from './StakingHeaderCard.module.pcss'
import { Avatar } from '../../tags/Avatar/Avatar'
import { Tag } from '../../tags/Tag/Tag'
import { Protocol, Vault } from '../../screens/StakingScreen/stakingReducer/types'
import { capitalize } from '../../../utils/formatting'

interface StakingHeaderCardProps {
  vault: Vault
  protocols: Protocol
}

export const StakingHeaderCard: FC<StakingHeaderCardProps> = ({ vault, protocols }) => {
  const pairSymbol = `${vault.underlying_assets.map((asset) => asset.symbol).join('/')}`

  return (
    <div className={`card ${classNames.container}`}>
      <div className={classNames.sideContainer}>
        <Avatar src={protocols[vault.protocol_id].logo_url} />
        <div>
          <h5>{pairSymbol}</h5>
          <p className={'body1'}>{capitalize(vault.protocol_id)}</p>
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
