import { Card } from '../../../cards/Card/Card'
import classNames from './StreakCard.module.pcss'
import { InfoIcon } from '../../../../assets/icons/InfoIcon'
import { Progressbar } from './Progressbar/Progressbar'
import { type ReactNode } from 'react'
import { TooltipWrapper } from '../../../layout/WithTooltip/TooltipWrapper'

interface Props {
	title: string
	button: ReactNode
	description?: JSX.Element
	streak: number
}

export const StreakCard = ({ title, button, description, streak }: Props) => {
	return (
		<Card className={classNames.container}>
			<div className="row jsb ac">
				<h4>{title}</h4>
				{description && (
					<TooltipWrapper
						place={'bottom-start'}
						className={classNames.tooltipWrap}
						tooltipId={title}
						tooltipContent={description}
					>
						<InfoIcon />
					</TooltipWrapper>
				)}
			</div>
			<div className="row gap-sm">
				<Progressbar streak={streak} />
			</div>
			{button}
		</Card>
	)
}
