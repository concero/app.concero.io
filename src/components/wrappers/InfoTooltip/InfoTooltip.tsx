import { TooltipWrapper } from '../WithTooltip/TooltipWrapper'
import { InfoIcon } from '../../../assets/icons/InfoIcon'
import classNames from './InfoTooltip.module.pcss'

interface Props {
	title?: string
	description: string
	tooltipId: string
}

export const InfoTooltip = ({ title, description, tooltipId }: Props) => {
	return (
		<TooltipWrapper
			place="bottom"
			className={classNames.tooltip}
			tooltipId={tooltipId}
			tooltipContent={
				<div className="gap-xs">
					{title && <h6>{title}</h6>}
					<p>{description}</p>
				</div>
			}
		>
			<InfoIcon />
		</TooltipWrapper>
	)
}
