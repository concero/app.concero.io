import { Tag } from '../../../../tags/Tag/Tag'
import classNames from './Progressbar.module.pcss'

interface ProgressbarStepProps {
	value: number
	total: number
	length?: number
}

const ProgressbarStep = ({ value, total, length = 49 }: ProgressbarStepProps) => {
	return (
		<div className={classNames.progressStep} style={{ width: `${length}px` }}>
			<div className={classNames.progressValue}></div>
		</div>
	)
}

interface ProgressbarItemProps {
	stepLength?: number
	value: number
}

const ProgressbarItem = ({ stepLength, value }: ProgressbarItemProps) => {
	return (
		<div className="gap-xs ac">
			<Tag size="sm" variant="branded">
				{value}x
			</Tag>
			<ProgressbarStep length={stepLength} />
		</div>
	)
}

const Separator = () => {
	return <span className={classNames.separator} />
}

export const Progressbar = () => {
	return (
		<div className="row">
			<div className="gap-sm">
				<p className="body1">1st Week</p>
				<div className="row gap-sm">
					<ProgressbarItem value={1.5} />
				</div>
			</div>
			<Separator />
			<div className="gap-sm">
				<p className="body1">Months</p>
				<div className="row gap-xs">
					<ProgressbarItem value={2} stepLength={45.75} />
					<ProgressbarItem value={2.5} stepLength={45.75} />
					<ProgressbarItem value={3} stepLength={45.75} />
					<ProgressbarItem value={4} stepLength={45.75} />
				</div>
			</div>
		</div>
	)
}
