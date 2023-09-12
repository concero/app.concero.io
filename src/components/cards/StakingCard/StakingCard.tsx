import { FC } from 'react'
import { animated, useSpring } from 'react-spring'
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'
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
  const pairSymbol = `${vault.underlying_assets.map((asset) => asset.symbol).join('/')}`
  const animProps = useSpring({
    height: isSelected ? 54 : 0,
    from: { height: isSelected ? 0 : 54 },
    config: { mass: 1, tension: 500, friction: 50 },
  })

  const handleChevronClick = (e) => e.stopPropagation()

  return (
    <div className={`${classNames.container} ${isSelected ? classNames.selected : ''}`} onClick={() => onClick(vault)}>
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
            variant="black"
            size="sm"
            rightIcon={!isSelected ? <IconChevronDown size={18} color={colors.text.secondary} /> : <IconChevronUp size={18} color={colors.text.secondary} />}
          />
        </div>
      </div>
      <div className={classNames.symbolContainer}>
        <h5>{vault.symbol}</h5>
      </div>
      <animated.div style={animProps}>
        <StakeButtons isSelected={isSelected} />
      </animated.div>
    </div>
  )
}
