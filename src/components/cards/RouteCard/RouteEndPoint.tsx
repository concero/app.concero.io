import { FC, useContext, useEffect, useState } from 'react'
import classNames from './RouteCard.module.pcss'
import { Avatar } from '../../tags/Avatar/Avatar'
import { DataContext } from '../../../hooks/DataContext/DataContext'
import { getChainLogoURIById } from './getChainLogoURIById'

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
}

function getFormatAmount(amount: string, decimals: number) {
  if (amount.includes('.')) {
    return parseFloat(amount).toFixed(2)
  }
  return (parseFloat(amount) / 10 ** decimals).toFixed(2)
}

export const RouteEndPoint: FC<RouteEndPointProps> = ({ side }) => {
  const [chainLogoURI, setChainLogoURI] = useState('')
  const { amount } = side.token
  const { getChains } = useContext(DataContext)

  useEffect(() => {
    getChainLogoURIById(Number(side.chain.id), getChains, setChainLogoURI)
  }, [])

  return (
    <div className={classNames.endPointContainer}>
      <div className={classNames.avatarContainer}>
        <Avatar src={side.token.logo_uri} size="md" />
        <Avatar src={chainLogoURI} size="xs" className={classNames.chainAvatar} />
      </div>
      <h4>{getFormatAmount(amount, side.token.decimals)}</h4>
    </div>
  )
}
