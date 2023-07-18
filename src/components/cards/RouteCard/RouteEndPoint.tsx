import { FC } from 'react'
import classNames from './RouteCard.module.pcss'
import { Avatar } from '../../tags/Avatar/Avatar'

interface RouteEndPointProps {
  side: {
    token: { name: string; address: string; symbol: string; decimals: number; price_usd: string; amount: string }
    chain: { id: number }
  }
  amount: string
}

export const RouteEndPoint: FC<RouteEndPointProps> = ({ side, amount }) => {
  return (
    <div className={classNames.endPointContainer}>
      <div className={classNames.avatarContainer}>
        <Avatar src={`src/assets/cryptoSymbols/${side.token.symbol}.svg`} size="md" />
        <Avatar src={`src/assets/cryptoSymbols/${side.chain.id}.svg`} size="xs" className={classNames.chainAvatar} />
      </div>
      <h4>{amount}</h4>
    </div>
  )
}
