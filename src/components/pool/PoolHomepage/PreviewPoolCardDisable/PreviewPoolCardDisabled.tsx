import classNames from './PreviewPoolCardDisable.module.pcss'
import { ConceroIcon } from '../../../../assets/icons/conceroIcon'
import { Card } from '../../../cards/Card/Card'
import { Button } from '../../../buttons/Button/Button'

export const PreviewPoolCardDisabled = () => {
	return (
		<Card className="w-full gap-xxl">
			<div className="gap-lg">
				<div className="row ac jsb">
					<div className="row ac gap-sm">
						<div className={classNames.logoWrap}>
							<ConceroIcon />
						</div>
						<h4 className={classNames.title}>ETH</h4>
					</div>
					<h3 className={classNames.value}>Coming soon</h3>
				</div>

				<div className={classNames.metric}>
					<p>Total Liquidity</p>
					<span>
						<b>-</b> from <b>-</b>
					</span>
				</div>

				<div className={classNames.metric}>
					<p>Rewards Distributed</p>
					<span>
						<b>-</b>
					</span>
				</div>
			</div>

			<Button className="w-full" size="lg" variant="secondary">
				Subscribe to newsletter
			</Button>
		</Card>
	)
}
