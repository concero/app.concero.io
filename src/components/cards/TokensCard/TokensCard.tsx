import { FC } from 'react'
import { IconLogout } from '@tabler/icons-react'
import classNames from './TokensCard.module.pcss'
import { CardHeader } from '../CardHeader/CardHeader'
import { StakingState } from '../../screens/StakingScreen/stakingReducer/types'
import { CryptoSymbol } from '../../tags/CryptoSymbol/CryptoSymbol'
import { colors } from '../../../constants/colors'
import { Button } from '../../buttons/Button/Button'

interface TokensCardProps {
  stakingState: StakingState
}

export const TokenRatioCard = ({ item }) => {
  const { name, ratio, logoURI } = item
  return (
    <div className={`card ${classNames.tokenItemContainer}`}>
      <div className={classNames.tokenItemHeader}>
        <CryptoSymbol src={logoURI ?? null} symbol={name ?? 'Unknown token'} />
        <div className={classNames.valueContainer}>
          <IconLogout size={16} color={colors.text.secondary} />
          <p className={'body1'}>{ratio + '%'}</p>
        </div>
      </div>
      <div className={classNames.chartContainer}>
        {name ? (
          <div style={{ width: `${ratio}%` }} className={classNames.chart} />
        ) : (
          <>
            <Button variant={'subtle'} size={'sm'}>
              Explorer
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export const TokensCard: FC<TokensCardProps> = ({ stakingState }) => {
  const item = {
    name: 'Ethereum',
    ratio: '50',
    logoURI: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880',
  }

  return (
    <div className={classNames.container}>
      <CardHeader title={'Tokens'} />
      <div className={classNames.innerContainer}>
        <TokenRatioCard item={item} />
      </div>
    </div>
  )
}
