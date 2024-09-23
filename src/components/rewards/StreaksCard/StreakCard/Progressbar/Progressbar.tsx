import { Tag } from '../../../../tags/Tag/Tag'
import classNames from './Progressbar.module.pcss'

type valueColor = 'color1' | 'color2' | 'color3' | 'color4' | 'color5'

interface ProgressbarProps {
	streak: number
}

interface ProgressbarStepProps {
	length?: number
	color?: valueColor
	value: number
	maxValue: number
}

const calculateProgress = (value: number, maxValue: number) => {
	if (value >= maxValue) return 100
	return (value / maxValue) * 100
}

const ProgressbarStep = ({ value = 0, maxValue = 7, length = 49, color = 'color1' }: ProgressbarStepProps) => {
	const progress = calculateProgress(value, maxValue)
	const valueColor = classNames[color]

	return (
		<div className={classNames.progressStep} style={{ width: `${length}px` }}>
			<div className={`${classNames.progressValue} ${valueColor}`} style={{ width: `${progress}%` }}></div>
		</div>
	)
}

interface ProgressbarItemProps {
	stepLength?: number
	title: number | string
	color: valueColor
	value: number
	maxValue: number
}

const ProgressbarItem = ({ stepLength, title, color, value, maxValue }: ProgressbarItemProps) => {
	return (
		<div className="gap-xs ac">
			<Tag size="sm" variant="branded">
				{title}x
			</Tag>
			<ProgressbarStep value={value} maxValue={maxValue} color={color} length={stepLength} />
		</div>
	)
}

const Separator = () => {
	return <span className={classNames.separator} />
}

export const Progressbar = ({ streak }: ProgressbarProps) => {
	return (
		<div className="row">
			<div className="gap-sm">
				<p className="body1">1st Week</p>
				<div className="row gap-sm">
					<ProgressbarItem value={streak} maxValue={7} color="color1" title={1.5} />
				</div>
			</div>
			<Separator />
			<div className="gap-sm">
				<p className="body1">Months</p>
				<div className="row gap-xs">
					<ProgressbarItem value={0} maxValue={28} color="color2" title={2} stepLength={45.75} />
					<ProgressbarItem value={0} maxValue={28} color="color3" title={2.5} stepLength={45.75} />
					<ProgressbarItem value={0} maxValue={28} color="color4" title={3} stepLength={45.75} />
					<ProgressbarItem value={0} maxValue={28} color="color5" title={4} stepLength={45.75} />
				</div>
			</div>
		</div>
	)
}
