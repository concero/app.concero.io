import { Tooltip } from 'react-tooltip'
import classNames from './WithTooltip.module.pcss'

export function WithTooltip({ WrappedComponent, tooltipId }) {
	return (
		<div>
			<div>
				<WrappedComponent />
			</div>

			<Tooltip className={classNames.tooltip} {...tooltipProps}></Tooltip>
		</div>
	)
}
