import classNames from './EarnRoute.module.pcss'
import { type ManageState } from '../useEarnReducer/types'
import { CardHeader } from '../../../CardHeader/CardHeader'

interface EarnRouteProps {
	manageState: ManageState
}

export function EarnRoute({ manageState }: EarnRouteProps) {
	const { route } = manageState
	return (
		<div className={`card ${classNames.container}`}>
			<CardHeader title="Route" />
			<div className={classNames.stepContainer}>
				{route.steps.map((step, index) => (
					<div key={index} className={classNames.step}>
						<p>{step.fromToken}</p>
					</div>
				))}
			</div>
		</div>
	)
}
