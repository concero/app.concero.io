import classNames from './StreakTooltip.module.pcss'

interface Props {
	title: string
	description: string
}

export const StreakTooltip = ({ title, description }: Props) => {
	return (
		<div className="gap-sm">
			<h6 className={classNames.title}>{title}</h6>
			<p className={`${classNames.description} body2`}>{description}</p>
		</div>
	)
}
