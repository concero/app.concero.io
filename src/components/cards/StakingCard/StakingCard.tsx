import classNames from './StakingCard.module.pcss'
import { Avatar } from '../../tags/Avatar/Avatar'
import { Vault } from '../../screens/StakingScreen/stakingReducer/types'
import { numberToFormatString } from '../../../utils/formatting'
import { Tag } from '../../tags/Tag/Tag'
import { getCategoryIconByTitle } from './getCategoryIconByTitle'
import { UnderlingTokens } from './UnderlingTokens/UnderlingTokens'

interface StakingCardProps {
  isSelected: boolean
  vault: Vault
  onClick: (id: string) => void
}

const undelingTokens = [
  {
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png',
    symbol: 'MATIC',
  },
  {
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png',
    symbol: 'ETH',
  },
]

export function StakingCard({ isSelected, vault, onClick }: StakingCardProps) {
  console.log('vault', vault)
  return (
    <div className={`${classNames.container} ${isSelected ? classNames.selected : ''}`} onClick={() => onClick(vault)}>
      <div>
        <div className={classNames.headerContainer}>
          <div className={classNames.headerSideContainer}>
            <Avatar src={vault.logoURI} size="md" />
            <h5>{`${numberToFormatString(vault.apy, 2)}%`}</h5>
            <Tag leftIcon={getCategoryIconByTitle('Liquid Staking')} color={'secondary'}>
              <p className={'body1'}>Liquid Staking</p>
            </Tag>
          </div>
          {/* <div className={classNames.headerSideContainer}>{renderTags({ vault, isSelected })}</div> */}
        </div>
        <h5 className={`body1 ${isSelected ? classNames.selectedText : ''}`}>{vault.symbol}</h5>
      </div>
      <UnderlingTokens underlingTokens={undelingTokens} />
    </div>
  )
}
