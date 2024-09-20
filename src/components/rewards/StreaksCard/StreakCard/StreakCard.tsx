import { Card } from '../../../cards/Card/Card'
import classNames from './StreakCard.module.pcss'
import { InfoIcon } from '../../../../assets/icons/InfoIcon'
import { Progressbar } from './Progressbar/Progressbar'
import { type ReactNode } from 'react'
import { TooltipWrapper } from '../../../wrappers/WithTooltip/TooltipWrapper'

interface Props {
	title: string
	button: ReactNode
	description?: string
}

export const StreakCard = ({ title, button, description }: Props) => {
	return (
		<Card className={classNames.container}>
			<div className="row jsb ac">
				<h4>{title}</h4>
				{description && (
					<TooltipWrapper tooltipId={title} tooltipContent={<p>{description}</p>}>
						<InfoIcon />
					</TooltipWrapper>
				)}
			</div>
			<div className="row gap-sm">
				<Progressbar />
			</div>
			{button}
		</Card>
	)
}
