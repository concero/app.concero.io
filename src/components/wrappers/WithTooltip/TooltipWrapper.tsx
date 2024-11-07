import { Tooltip } from 'react-tooltip'
import classNames from './TooltipWrapper.module.pcss'
import { type ReactNode } from 'react'

interface TooltipProps {
	children: ReactNode
	tooltipId: string
	tooltipContent: JSX.Element
	className?: string
	classNameWrapper?: string
	place?:
		| 'top'
		| 'top-start'
		| 'top-end'
		| 'right'
		| 'right-start'
		| 'right-end'
		| 'bottom'
		| 'bottom-start'
		| 'bottom-end'
		| 'left'
		| 'left-start'
		| 'left-end'
}

export function TooltipWrapper({
	children,
	tooltipId,
	tooltipContent,
	className,
	classNameWrapper,
	place,
}: TooltipProps) {
	return (
		<>
			<div data-tooltip-id={tooltipId} className={classNameWrapper}>
				{children}
			</div>

			<Tooltip place={place} id={tooltipId} className={`${classNames.tooltip} ${className}`}>
				{tooltipContent}
			</Tooltip>
		</>
	)
}
