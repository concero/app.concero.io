import { FC } from 'react'
import classNames from './RouteCard.module.pcss'
import { Avatar } from '../../tags/Avatar/Avatar'

interface RouteEndPointProps {
  side: {
    token: {
      name: string
      symbol: string
    }
    chain: {
      name: string
      symbol: string
    }
  }
  amount: string
}

export const RouteEndPoint: FC<RouteEndPointProps> = ({ side, amount }) => (
  <div className={classNames.endPointContainer}>
    <div className={classNames.avatarContainer}>
      <Avatar src={`src/assets/cryptoSymbols/${side.token.name}.svg`} size="md" />
      <Avatar
        src={`src/assets/cryptoSymbols/${side.chain.name}.svg`}
        size="xs"
        className={classNames.chainAvatar}
      />
    </div>
    <h5>{amount}</h5>
  </div>
)
