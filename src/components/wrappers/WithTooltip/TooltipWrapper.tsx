import { Tooltip } from 'react-tooltip'
import classNames from './TooltipWrapper.module.pcss'
import { type ReactNode } from 'react'

interface TooltipProps {
	children: ReactNode
	tooltipId: string
	tooltipContent: JSX.Element
}

export function TooltipWrapper({ children, tooltipId, tooltipContent }: TooltipProps) {
	return (
		<div>
			<div data-tooltip-id={tooltipId}>{children}</div>

			<Tooltip id={tooltipId} className={classNames.tooltip}>
				{tooltipContent}
			</Tooltip>
		</div>
	)
}
