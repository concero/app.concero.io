import { Card } from '../../../cards/Card/Card'
import { Button } from '../../../buttons/Button/Button'
import classNames from './StreakCard.module.pcss'
import { InfoIcon } from '../../../../assets/icons/InfoIcon'
import { Progressbar } from './Progressbar/Progressbar'

interface Props {
	title: string
	buttonTitle: string
	onClick: (event: React.MouseEvent) => void | Promise<void>
}

export const StreakCard = ({ title, buttonTitle, onClick }: Props) => {
	return (
		<Card className={classNames.container}>
			<div className="row jsb ac">
				<h4>{title}</h4>
				<InfoIcon />
			</div>
			<div className="row gap-sm">
				<Progressbar />
			</div>
			<Button onClick={onClick} size="sm" variant="secondary">
				{buttonTitle}
			</Button>
		</Card>
	)
}
