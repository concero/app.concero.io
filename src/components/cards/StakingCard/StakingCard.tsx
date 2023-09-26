import classNames from './StakingCard.module.pcss'
import { Avatar } from '../../tags/Avatar/Avatar'
import { Vault } from '../../screens/StakingScreen/stakingReducer/types'
import { formatNumber, numberToFormatString } from '../../../utils/formatting'
import { UnderlyingTokens } from './UnderlyingTokens/UnderlyingTokens'
import { CategoryTag } from '../../tags/CategoryTag/CategoryTag'
import { IconCurrencyDollar } from '@tabler/icons-react'

interface StakingCardProps {
  isSelected: boolean
  vault: Vault
  onClick: (id: string) => void
}

export const StakedAmountTag = ({ value }) => {
  return (
    <div className={classNames.stakedAmountInnerContainer}>
      <div>
        <IconCurrencyDollar size={16} color={'var(--color-primary-400'} />
      </div>
      <h5>{value}</h5>
    </div>
  )
}

export function StakingCard({ isSelected, vault, onClick }: StakingCardProps) {
  return (
    <div className={`${classNames.container} ${isSelected ? classNames.selected : ''}`} onClick={() => onClick(vault)}>
      <div>
        <div className={classNames.headerContainer}>
          <div className={classNames.headerSideContainer}>
            <Avatar src={vault.protocol?.logoURI} size="md" />
            <h5>{`${numberToFormatString(vault.apy, 2)}%`}</h5>
            {vault.category ? <CategoryTag category={vault.category} isSelected={isSelected} /> : null}
          </div>
          {/* <div className={classNames.headerSideContainer}>{renderTags({ vault, isSelected })}</div> */}
        </div>
        <h5 className={`body1 ${isSelected ? classNames.selectedText : ''}`}>{vault.widoSymbol}</h5>
      </div>
      {vault.stakedAmount ? (
        <StakedAmountTag value={formatNumber(vault.stakedAmount, { decimals: vault.decimals, disableUnit: true })} />
      ) : (
        <UnderlyingTokens underlyingTokens={vault.inputTokens} isSelected={isSelected} />
      )}
    </div>
  )
}
