import { FC } from 'react'
import classNames from './RouteCard.module.pcss'
import { Avatar } from '../../tags/Avatar/Avatar'
import { getChainLogoURIById } from '../../../utils/getChainLogoURIById'
import { numberToFormatString } from '../../../utils/formatting'

interface RouteEndPointProps {
  side: {
    token: {
      name: string
      address: string
      symbol: string
      decimals: number
      price_usd: string
      amount: string
      logo_uri: string
    }
    chain: { id: number }
  }
  amount: string
}

export const RouteEndPoint: FC<RouteEndPointProps> = ({ side, amount }) => {
  const chainLogoURI = getChainLogoURIById(Number(side.chain.id))

  return (
    <div className={classNames.endPointContainer}>
      <div className={classNames.avatarContainer}>
        <Avatar src={side.token.logo_uri} size="md" />
        <Avatar src={chainLogoURI} size="xs" className={classNames.chainAvatar} />
      </div>
      <h4>{numberToFormatString(parseFloat(amount), 2, true)}</h4>
    </div>
  )
}
