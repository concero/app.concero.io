import { Tag } from '@concero/ui-kit'
import cls from './ProgressLine.module.scss'
import { forwardRef } from 'react'
import { VStack } from '../../Stack'

type TSegmentedProgressBarProps = {
	variant: 'segmented'
	className?: string
	/** Number of active segments */
	value: number
	maxSegments?: number
	segmentGap?: number
}

type TTagOptions = {
	show: boolean
	transform?: (value: number) => string
}
type TSolidProgressBarProps = {
	variant: 'solid'
	className?: string
	/** Percent % */
	value: number
	tag?: TTagOptions
}

export type TProgressLineProps = TSolidProgressBarProps | TSegmentedProgressBarProps

export const ProgressLine = forwardRef<HTMLDivElement, TProgressLineProps>((props, ref) => {
	const { className, value } = props

	if (props.variant === 'segmented') {
		const maxSegments = props.maxSegments ?? 10
		const gap = props.segmentGap ?? 2
		const active = Math.max(0, Math.min(maxSegments, Math.floor(value)))

		return (
			<div className={`${cls.segmentedProgressBar} ${className || ''}`} ref={ref}>
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
	if (props.variant === 'solid') {
		const safeValue = Math.max(0, Math.min(100, value))
		const isShowTag = props.tag?.show
		const transformValue = props.tag?.transform
		let valueToShow: number | string = safeValue

		if (transformValue) {
			valueToShow = transformValue(safeValue)
		}
		if (isShowTag) {
			return (
				<VStack
					gap="space_0_5"
					max
					htmlProps={{
						style: {
							//@ts-expect-error TODO: fix types
							'--progress': `${safeValue}%`,
						},
					}}
					className={cls.solid_container_track}
				>
					<Tag variant="branded" size="m" className={cls.tag}>
						{valueToShow}
					</Tag>
					<div
						className={cls.track}
						style={{ '--progress': `${safeValue}%` } as React.CSSProperties}
						ref={ref}
					>
						<div className={cls.fill} />
					</div>
				</VStack>
			)
		}
		return (
			<div className={cls.track} style={{ '--progress': `${safeValue}%` } as React.CSSProperties} ref={ref}>
				<div className={cls.fill} />
			</div>
		)
	}
	return null
})
