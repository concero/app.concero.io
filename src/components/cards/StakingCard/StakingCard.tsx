import { FC, useState } from 'react'
import classNames from './StakingCard.module.pcss'
import { Avatar } from '../../tags/Avatar/Avatar'
import Icon from '../../Icon'
import { secondsConverter } from '../../../utils/formatting'
import { colors } from '../../../constants/colors'
import { Button } from '../../buttons/Button/Button'

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
          <Icon name={'Lock'} className={`${classNames.icon} ${isSelected ? classNames.selectedText : ''}`} />
          <h5 className={`body1 ${isSelected ? classNames.selectedText : ''}`}>
            {secondsConverter(route.execution_duration_sec)}
          </h5>
          <Icon name={'Stack2'} className={`${classNames.icon} ${isSelected ? classNames.selectedText : ''}`} />
          {route.insured ? <Icon name={'Shield'} className={classNames.icon} color={colors.green.main} /> : null}
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
      {!isCollapsed ? (
        <div className={classNames.buttonContainer}>
          <Button variant={'primary'} className={classNames.stakeButton}>
            <Icon name={'ArrowsDiff'} className={classNames.buttonIcon} />
            Stake more
          </Button>
          <Button variant={'primary'} className={classNames.stakeButton}>
            <Icon name={'ArrowsDiff'} className={classNames.buttonIcon} />
            Claim rewards
          </Button>
        </div>
      ) : null}
    </div>
  )
}
