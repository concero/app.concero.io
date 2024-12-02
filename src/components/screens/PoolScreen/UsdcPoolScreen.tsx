import classNames from './PoolScreen.module.pcss'
import { ConceroPool } from '../../pool/ConceroPool/ConceroPool'
import { config } from '../../../constants/config'
import { TechWorksScreen } from '../TechWorksScreen/TechWorksScreen'

export const UsdcPoolScreen = () => {
	if (config.POOL_IS_NOT_AVAILABLE) {
		return <TechWorksScreen />
	}

	return (
		<div className={classNames.poolWrapper}>
			<div className={classNames.poolContainer}>
				<ConceroPool />
			</div>
		</div>
	)
}
