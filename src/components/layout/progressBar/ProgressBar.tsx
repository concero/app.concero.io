import classNames from './ProgressBar.module.pcss'

export interface ProgressBarProps {
	percentage: number
	width?: number
}

export function ProgressBar({ percentage, width = 317 }: ProgressBarProps) {
	return (
		<div className={classNames.progressBar} style={{ maxWidth: width, width: '100%' }}>
			<span className={classNames.progressLine} style={{ width: `${percentage}%` }} />
		</div>
	)
}
