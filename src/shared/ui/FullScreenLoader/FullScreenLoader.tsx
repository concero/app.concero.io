import { RaceBy } from '@uiball/loaders'
import classNames from './FullScreenLoader.module.pcss'

export const FullScreenLoader = () => {
	return (
		<div className={classNames.container} style={{ backgroundColor: 'transparent' }}>
			<RaceBy color="var(--color-primary-500)" />
		</div>
	)
}
