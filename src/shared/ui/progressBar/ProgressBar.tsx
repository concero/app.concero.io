import cls from './ProgressBar.module.scss'

type TSegmentedProgressBarProps = {
	className?: string
	value: number
	maxSegments?: number
	segmentGap?: number
}

type TTagOptions = {
	show: boolean
	transform: (value: number) => string
}
type TSolidProgressBarProps = {
	className?: string
	value: number
	tag?: TTagOptions
}

type TProps = {
	variant?: 'solid' | 'segmented'
} & (TSolidProgressBarProps | TSegmentedProgressBarProps)

export const ProgressBar = (props: TProps) => {
	const { className, variant = 'solid', value } = props

	if (variant === 'segmented') {
		const maxSegments = 'maxSegments' in props ? (props.maxSegments ?? 10) : 10
		const gap = 'segmentGap' in props ? (props.segmentGap ?? 2) : 2
		const active = Math.max(0, Math.min(maxSegments, Math.floor(value)))

		return (
			<div className={`${cls.segmentedProgressBar} ${className || ''}`}>
				<div
					className={cls._segments}
					style={
						{
							'--max-segments': maxSegments,
							'--segment-gap': `${gap}px`,
						} as React.CSSProperties
					}
				>
					{Array.from({ length: maxSegments }).map((_, i) => (
						<div key={i} className={`${cls._segment} `} data-active={i < active} />
					))}
				</div>
			</div>
		)
	}
	if (variant === 'solid') {
		const safeValue = Math.max(0, Math.min(100, value))
		return (
			<div className={cls.track} style={{ '--progress': `${safeValue}%` } as React.CSSProperties}>
				<div className={cls.fill} />
			</div>
		)
	}
	return null
}
