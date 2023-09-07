import { FC } from 'react'
import classNames from './StakingHeaderCard.module.pcss'
import { Avatar } from '../../tags/Avatar/Avatar'
import { Tag } from '../../tags/Tag/Tag'
import { Protocol, Vault } from '../../screens/StakingScreen/stakingReducer/types'

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
        <h5>{pairSymbol}</h5>
        <Tag color="main">
          <p className="tagBody">Your position</p>
        </Tag>
      </div>
      <div className={classNames.sideContainer}>
        <Tag color="main">
          <p className="tagBody">Best</p>
        </Tag>
        <Tag color={'green'} title={'Insurable'} />
      </div>
    </div>
  )
}
