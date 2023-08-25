import { FC, useState } from 'react'
import classNames from './StakingCard.module.pcss'
import { Avatar } from '../../tags/Avatar/Avatar'
import { colors } from '../../../constants/colors'
import { Button } from '../../buttons/Button/Button'
import { StakeButtons } from './StakeButtons'
import { renderTags } from './renderTags'
import { Protocol, Vault } from '../../screens/StakingScreen/stakingReducer/types'

interface StakingCardProps {
  isSelected: boolean
  vault: Vault
  protocols: Protocol
  onClick: (id: string) => void
}

export const StakingCard: FC<StakingCardProps> = ({ isSelected, vault, protocols, onClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const pairSymbol = `${vault.underlying_assets.map((asset) => asset.symbol).join('/')}`

  const handleChevronClick = (e) => {
    e.stopPropagation()
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div
      className={`${classNames.container} ${isSelected ? classNames.selectedContainer : ''}`}
      onClick={() => onClick(vault.id)}
    >
      <div className={classNames.headerContainer}>
        <div className={classNames.headerSideContainer}>
          <Avatar src={protocols[vault.protocol_id].logo_url} size="md" />
          <h5>{`${vault.yields[0].apy}%`}</h5>
          <h5 className={`body1 ${isSelected ? classNames.selectedText : ''}`}>{pairSymbol}</h5>
        </div>
        <div className={classNames.headerSideContainer}>
          {renderTags({ vault, isSelected })}
          <Button
            onClick={(e) => handleChevronClick(e)}
            variant={'black'}
            size={'sm'}
            rightIcon={{
              name: `${isCollapsed ? 'ChevronDown' : 'ChevronUp'}`,
              iconProps: { size: 18, color: colors.text.secondary },
            }}
          />
        </div>
      </div>
      <StakeButtons isCollapsed={isCollapsed} />
    </div>
  )
}
