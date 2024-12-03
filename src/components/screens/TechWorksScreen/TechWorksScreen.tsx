import classNames from './TechWorksScreen.module.pcss'
import { Card } from '../../cards/Card/Card'

export const TechWorksScreen = () => {
	return (
		<div className={classNames.wrapper}>
			<Card className={classNames.banner}>
				<h3>We will be back up and running shortly.</h3>
				<p>
					Our infrastructure is currently undergoing maintenance to improve your experience. Thank you for
					your patience!
				</p>
			</Card>
		</div>
	)
}
