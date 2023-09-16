import classNames from './StakingCard.module.pcss'
import { Avatar } from '../../tags/Avatar/Avatar'
import { renderTags } from './renderTags'
import { Vault } from '../../screens/StakingScreen/stakingReducer/types'
import { numberToFormatString } from '../../../utils/formatting'

interface StakingCardProps {
  isSelected: boolean
  vault: Vault
  onClick: (id: string) => void
}

export function StakingCard({ isSelected, vault, onClick }: StakingCardProps) {
  return (
    <div className={`${classNames.container} ${isSelected ? classNames.selected : ''}`} onClick={() => onClick(vault)}>
      <div className={classNames.headerContainer}>
        <div className={classNames.headerSideContainer}>
          <Avatar src={vault.logoURI} size="md" />
          <h5>{`${numberToFormatString(vault.apy, 2)}%`}</h5>
          <h5 className={`body1 ${isSelected ? classNames.selectedText : ''}`}>{vault.symbol}</h5>
        </div>
        <div className={classNames.headerSideContainer}>{renderTags({ vault, isSelected })}</div>
      </div>
    </div>
  )
}
