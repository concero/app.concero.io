import { FC, useState } from 'react'
import classNames from './StakingCard.module.pcss'
import { Avatar } from '../../tags/Avatar/Avatar'
import { colors } from '../../../constants/colors'
import { Button } from '../../buttons/Button/Button'
import { StakeButtons } from './StakeButtons'
import { renderTags } from './renderTags'

interface StakingCardProps {
  isSelected: boolean
  route: any
  onClick: (id: string) => void
}

export const StakingCard: FC<StakingCardProps> = ({ isSelected, route, onClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const handleChevronClick = (e) => {
    e.stopPropagation()
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div
      className={`${classNames.container} ${isSelected ? classNames.selectedContainer : ''}`}
      onClick={() => onClick(route.id)}
    >
      <div className={classNames.headerContainer}>
        <div className={classNames.headerSideContainer}>
          <Avatar src={route.dex.logoURI} size={'md'} />
          <h5>{route.interest_rate}</h5>
          <h5
            className={`body1 ${isSelected ? classNames.selectedText : ''}`}
          >{`${route.from.token.symbol}/${route.to.token.symbol}`}</h5>
        </div>
        <div className={classNames.headerSideContainer}>
          {renderTags({ route, isSelected })}
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
