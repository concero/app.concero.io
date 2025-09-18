import classNames from './ProgressBar.module.pcss'
import { toLocaleNumber } from '../../../utils/formatting'
import { SkeletonLoader } from '../SkeletonLoader/SkeletonLoader'
import { Tag } from '../Tag/Tag'
import { useEffect, useRef, useState } from 'react'

/**@deprecated */
export interface ProgressBarProps {
	type?: 'big' | 'medium' | 'float'
	width?: number | string
	symbol?: string
	isLoading?: boolean
	minValue?: number
	currentValue: number
	maxValue: number
}
/**@deprecated */
export function ProgressBar({
	width = '100%',
	type = 'big',
	symbol = '$',
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

	const percent = maxValue > 0 ? (currentValue / maxValue) * 100 : 0

	const progressValueBig = isLoading ? (
		<SkeletonLoader width={128} height={27.5} />
	) : (
		<h3 className={classNames.value1}>
			{toLocaleNumber(currentValue)} <span className={classNames.maxValue1}>/{toLocaleNumber(maxValue)}</span>
		</h3>
	)

	const progressValueMedium = isLoading ? (
		<SkeletonLoader width={64} height={20} />
	) : (
		<h3 className={classNames.value2}>
			{toLocaleNumber(currentValue)} <span className={classNames.maxValue2}>/{toLocaleNumber(maxValue)}</span>
		</h3>
	)

	const progressLine = isLoading ? (
		<SkeletonLoader height={8} />
	) : (
		<div ref={lineRef} className={classNames.progressBar} style={{ maxWidth: width, width: '100%' }}>
			<span className={classNames.progressLine} style={{ maxWidth: width, width: `${percent}%` }}></span>
		</div>
	)

	const progressRange = (
		<div className="row jsb ac">
			<p className="body1">{toLocaleNumber(minValue)}</p>
			<p className="body1">{toLocaleNumber(maxValue)}</p>
		</div>
	)

	if (type === 'big' || type === 'medium') {
		return (
			<div className={classNames.full_width}>
				{type === 'big' ? progressValueBig : progressValueMedium}
				{progressLine}
				{progressRange}
			</div>
		)
	}

	const marginQuery =
		percent === 0
			? 0
			: `clamp(0px, calc(${percent}% - ${floatValueMargin}px), calc(${progressLineWidth}px - ${floatValueWidth}px))`

	return (
		<div className={classNames.full_width}>
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
						<Tag size="md" variant="branded">
							{toLocaleNumber(currentValue)}
							{symbol}
						</Tag>
					</div>
				</div>
			)}

			{progressLine}
			{progressRange}
		</div>
	)
}
