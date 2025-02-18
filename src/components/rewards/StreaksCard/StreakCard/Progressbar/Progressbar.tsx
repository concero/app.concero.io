import { Tag } from '../../../../layout/Tag/Tag'
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

interface ProgressbarItemProps {
	stepLength?: number
	title: number | string
	color: valueColor
	value: number
	maxValue: number
}

const fillProgressBars = (totalDays: number) => {
	const progress = [0, 0, 0, 0, 0] // [week, ...months]

	// fill week
	if (totalDays <= 7) {
		progress[0] = totalDays
	} else {
		progress[0] = 7
		totalDays -= 7
	}

	// fill months
	for (let i = 1; i <= 4; i++) {
		if (totalDays <= 7) {
			break
		} else if (totalDays >= 7 && totalDays < 28) {
			progress[i] = totalDays / 7
			break
		} else {
			progress[i] = 4
			totalDays -= 28
		}
	}

	return progress
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

const ProgressbarItem = ({ stepLength, title, color, value, maxValue }: ProgressbarItemProps) => {
	const progress = calculateProgress(value, maxValue)
	const isFinished = progress === 100
	const isNotStarted = progress <= 0

	return (
		<div className="gap-xs ac">
			<Tag
				size="sm"
				className={isNotStarted ? classNames.disabled : ''}
				variant={isFinished ? 'branded' : 'neutral'}
			>
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
	const result = fillProgressBars(streak)

	return (
		<div className="row">
			<div className="gap-sm">
				<p className={classNames.date}>1st Week</p>
				<div className="row gap-sm">
					<ProgressbarItem value={result[0]} maxValue={7} color="color1" title={1.5} />
				</div>
			</div>
			<Separator />
			<div className="gap-sm">
				<p className={classNames.date}>Months</p>
				<div className="row gap-xs">
					<ProgressbarItem value={result[1]} maxValue={4} color="color2" title={2} stepLength={45.75} />
					<ProgressbarItem value={result[2]} maxValue={4} color="color3" title={2.5} stepLength={45.75} />
					<ProgressbarItem value={result[3]} maxValue={4} color="color4" title={3} stepLength={45.75} />
					<ProgressbarItem value={result[4]} maxValue={4} color="color5" title={4} stepLength={45.75} />
				</div>
			</div>
		</div>
	)
}
