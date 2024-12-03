import classNames from './PoolScreen.module.pcss'
import { PoolHomepage } from '../../pool/PoolHomepage/PoolHomepage'
import { config } from '../../../constants/config'
import { TechWorksScreen } from '../TechWorksScreen/TechWorksScreen'

export const PoolScreen = () => {
	if (config.POOL_IS_NOT_AVAILABLE) {
		return <TechWorksScreen />
	}

	return (
		<div className={classNames.poolWrapper}>
			<div className={classNames.poolContainer}>
				<PoolHomepage />
			</div>
		</div>
	)
}
