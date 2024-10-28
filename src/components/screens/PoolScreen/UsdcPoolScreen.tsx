import classNames from './PoolScreen.module.pcss'
import { UsdcPool } from '../../pool/UsdcPool/UsdcPool'

export const UsdcPoolScreen = () => {
	return (
		<div className={classNames.poolWrapper}>
			<div className={classNames.poolContainer}>
				<UsdcPool />
			</div>
		</div>
	)
}
