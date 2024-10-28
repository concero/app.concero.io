import classNames from './PoolScreen.module.pcss'
import { PoolHomepage } from '../../pool/PoolHomepage/PoolHomepage'

export const PoolScreen = () => {
	return (
		<div className={classNames.poolWrapper}>
			<div className={classNames.poolContainer}>
				<PoolHomepage />
			</div>
		</div>
	)
}
