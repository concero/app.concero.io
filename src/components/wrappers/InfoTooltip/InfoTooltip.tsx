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
			className={classNames.tooltip}
			tooltipId={tooltipId}
			tooltipContent={
				<>
					{title && <h6>{title}</h6>}
					<p>{description}</p>
				</>
			}
		>
			<InfoIcon />
		</TooltipWrapper>
	)
}
