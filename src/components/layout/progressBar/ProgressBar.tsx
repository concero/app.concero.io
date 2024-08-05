import classNames from './ProgressBar.module.pcss'

export interface ProgressBarProps {
	percentage: number
	width?: number | string
}

export function ProgressBar({ percentage, width = '100%' }: ProgressBarProps) {
	return (
		<div className={classNames.progressBar} style={{ maxWidth: width, width: '100%' }}>
			<span className={classNames.progressLine} style={{ maxWidth: width, width: `${percentage}%` }} />
		</div>
	)
}
