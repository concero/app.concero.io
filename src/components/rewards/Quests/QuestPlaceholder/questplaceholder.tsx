import { SkeletonLoader } from '../../../layout/SkeletonLoader/SkeletonLoader'
import classNames from './questplaceholder.module.pcss'
import { Card } from '../../../cards/Card/Card'
import { IconButton } from '../../../buttons/IconButton/IconButton'
import { ArrowRightIcon } from '../../../../assets/icons/ArrowRightIcon'
import { Loader } from '../../../layout/Loader/Loader'

interface QuestPlaceholderProps {
	variant?: 'big' | 'normal' | 'small'
	className?: string
}

export const QuestPlaceholder = ({ variant = 'big', className }: QuestPlaceholderProps) => {
	return (
		<div style={{ cursor: 'default' }} className={`${classNames.questCard} ${classNames[variant]} ${className}`}>
			<Card className={`jsb h-full gap-lg`} key={variant}>
				<div className="gap-sm">
					{variant !== 'small' && (
						<div className="row jsb ac">
							<SkeletonLoader width={64} height={16} />
							<SkeletonLoader width={132} height={26} />
						</div>
					)}
					<div className="h-full gap-xs">
						<SkeletonLoader width={variant === 'big' ? 233 : 157} height={28} />
						<SkeletonLoader width={128} height={16} />
					</div>
				</div>

				{variant === 'big' && (
					<div className={`${classNames.loadingContainer}`}>
						<Loader variant="neutral" />
					</div>
				)}

				<div className="row w-full jfe">
					<IconButton size="sm" variant="secondary">
						<ArrowRightIcon />
					</IconButton>
				</div>
			</Card>
		</div>
	)
}
