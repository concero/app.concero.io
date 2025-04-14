import classNames from './ProgressBar.module.pcss'
import { toLocaleNumber } from '../../../utils/formatting'
import { SkeletonLoader } from '../SkeletonLoader/SkeletonLoader'
import { useEffect, useRef, useState } from 'react'
import { Tag } from '@concero/ui-kit'
import clsx from 'clsx'

type TProgressStatus = 'default' | 'success' | 'danger' | 'warning'
export interface ProgressBarProps {
	type?: 'big' | 'medium' | 'float'
	width?: number | string
	symbol?: string
	isLoading?: boolean
	minValue?: number
	currentValue: number
	maxValue: number
	status?: TProgressStatus
}

export function ProgressBar({
	width = '100%',
	type = 'big',
	symbol = '$',
	status = 'default',
	isLoading,
	currentValue,
	minValue = 0,
	maxValue,
}: ProgressBarProps) {
	const floatRef = useRef<HTMLDivElement | null>(null)
	const lineRef = useRef<HTMLDivElement | null>(null)
	const [floatValueWidth, setFloatValueWidth] = useState(0)
	const [progressLineWidth, setProgressLineWidth] = useState(0)

	const floatValueMargin = floatValueWidth === 0 ? 0 : floatValueWidth / 2

	useEffect(() => {
		if (floatRef.current) {
			const { width: elWidth } = floatRef.current.getBoundingClientRect()
			setFloatValueWidth(elWidth)
		}

		if (lineRef.current) {
			const { width: elWidth } = lineRef.current.getBoundingClientRect()
			setProgressLineWidth(elWidth)
		}
	}, [isLoading, currentValue, floatRef])

	const percent = (currentValue / maxValue) * 100

	const progressLine = isLoading ? (
		<SkeletonLoader height={8} />
	) : (
		<div ref={lineRef} className={classNames.progressBar} style={{ maxWidth: width, width: '100%' }}>
			<span
				className={clsx(classNames.progress_line, classNames[status])}
				style={{ maxWidth: width, width: `${percent}%` }}
			></span>
		</div>
	)

	if (type === 'big' || type === 'medium') {
		return <div className="gap-sm">{progressLine}</div>
	}

	const marginQuery =
		percent === 0
			? 0
			: `clamp(0px, calc(${percent}% - ${floatValueMargin}px), calc(${progressLineWidth}px - ${floatValueWidth}px))`

	return (
		<div className="gap-sm">
			{isLoading ? (
				<SkeletonLoader width={64} height={34} />
			) : (
				<div className={classNames.currentValueWrapper}>
					<div
						className={classNames.currentValue}
						ref={floatRef}
						style={{
							marginLeft: marginQuery,
						}}
					>
						<Tag size="m" variant="branded">
							{toLocaleNumber(currentValue)}
							{symbol}
						</Tag>
					</div>
				</div>
			)}

			{progressLine}
		</div>
	)
}
