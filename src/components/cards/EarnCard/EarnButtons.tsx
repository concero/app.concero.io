import { animated, useSpring } from '@react-spring/web'
import { FC } from 'react'
import { IconArrowsDiff } from '@tabler/icons-react'
import classNames from './EarnCard.module.pcss'
import { Button } from '../../buttons/Button/Button'

interface StakeButtonsProps {
	isCollapsed: boolean
}

export const EarnButtons: FC<StakeButtonsProps> = ({ isSelected }) => {
	const buttonProps = useSpring({
		opacity: isSelected ? 1 : 0,
		transform: `translateY(${isSelected ? 0 : -10}px)`,
		from: { opacity: isSelected ? 0 : 1, transform: `translateY(${isSelected ? -10 : 0}px)` },
		config: { mass: 1, tension: 500, friction: 40 },
	})

	return (
		<div className={classNames.buttonContainer}>
			<animated.div style={buttonProps} className={classNames.stakeButton}>
				<Button variant="primary">
					<IconArrowsDiff className={classNames.buttonIcon} />
					Stake more
				</Button>
			</animated.div>
			<animated.div style={buttonProps} className={classNames.stakeButton}>
				<Button variant="primary">
					<IconArrowsDiff className={classNames.buttonIcon} />
					Claim rewards
				</Button>
			</animated.div>
		</div>
	)
}
