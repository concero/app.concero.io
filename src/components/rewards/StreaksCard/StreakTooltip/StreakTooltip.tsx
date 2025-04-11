import { Tag } from '@concero/ui-kit'
import cls from './StreakTooltip.module.pcss'

interface Props {
	title: string
	description: string
}

export const StreakTooltip = ({ title, description }: Props) => {
	return (
		<div className={cls.streak_tooltip_wrap}>
			<div className={cls.head_wrap}>

			<h6 className={cls.title}>{title}</h6>
			<p className={`${cls.description} body2`}>{description}</p>
			</div>
			<div className={cls.list}>
				<div className={cls.item}>
					<span>1st week</span>
					<Tag variant="branded" size="s">
						1.5x
					</Tag>
				</div>
				<div className={cls.separator}></div>
				<div className={cls.item}>
					<span>1st month</span>
					<Tag variant="branded" size="s">
						2x
					</Tag>
				</div>
				<div className={cls.separator}></div>
				<div className={cls.item}>
					<span>2nd month</span>
					<Tag variant="branded" size="s">
						2.5x
					</Tag>
				</div>
				<div className={cls.separator}></div>
				<div className={cls.item}>
					<span>3d month</span>
					<Tag variant="branded" size="s">
						3x
					</Tag>
				</div>
				<div className={cls.separator}></div>
				<div className={cls.item}>
					<span>4d month</span>
					<Tag variant="branded" size="s">
						4x
					</Tag>
				</div>
			</div>
		</div>
	)
}
