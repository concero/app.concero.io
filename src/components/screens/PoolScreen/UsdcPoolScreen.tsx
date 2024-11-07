import classNames from './PoolScreen.module.pcss'
import { ConceroPool } from '../../pool/ConceroPool/ConceroPool'

export const UsdcPoolScreen = () => {
	return (
		<div className={classNames.poolWrapper}>
			<div className={classNames.poolContainer}>
				<ConceroPool />
			</div>
		</div>
	)
}
