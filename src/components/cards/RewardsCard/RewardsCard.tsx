import { FC } from 'react'
import { StakingState } from '../../screens/StakingScreen/stakingReducer/types'
import classNames from './RewardsCard.module.pcss'
import { CryptoSymbol } from '../../tags/CryptoSymbol/CryptoSymbol'
import { CardHeader } from '../CardHeader/CardHeader'
import { IconMoneybag } from '@tabler/icons-react'
import { colors } from '../../../constants/colors'

interface RewardsCardProps {
  stakingCard: StakingState
}

interface RewardsItemCardProps {
  item: {
    name: string
    logoURI: string
    value: string
  }
}

const RewardsItemCard: FC<RewardsItemCardProps> = ({ item }) => {
  const { name, logoURI, value } = item

  return (
    <div className={`card ${classNames.rewardsItemContainer}`}>
      <CryptoSymbol symbol={name} src={logoURI} />
      <div className={classNames.valueContainer}>
        <IconMoneybag size={16} color={colors.primary.main} />
        <p className={'body1'}>{value + '%'}</p>
      </div>
    </div>
  )
}

export const RewardsCard: FC<RewardsCardProps> = ({ stakingCard }) => {
  const item = {
    name: 'Ethereum',
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png',
    value: '20',
  }

  return (
    <div className={classNames.container}>
      <CardHeader title={'Rewards'} />
      <RewardsItemCard item={item} />
    </div>
  )
}
