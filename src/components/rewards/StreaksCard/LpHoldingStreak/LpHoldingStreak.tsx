import { Card } from '../../../cards/Card/Card'
import { Button } from '../../../buttons/Button/Button'
import classNames from './LpHoldingStreak.module.pcss'
import { InfoIcon } from '../../../../assets/icons/InfoIcon'
import { Progressbar } from './Progressbar/Progressbar'

export const LpHoldingStreak = () => {
	return (
		<Card className={classNames.container}>
			<div className="row jsb ac">
				<h4>LP Holding Streak</h4>
				<InfoIcon />
			</div>
			<Progressbar />
			<Button size="sm" variant="secondary">
				Provide liquidity
			</Button>
		</Card>
	)
}
