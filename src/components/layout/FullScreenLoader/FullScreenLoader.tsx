import { type FC } from 'react'
import { RaceBy } from '@uiball/loaders'
import classNames from './FullScreenLoader.module.pcss'

export interface FullScreenLoaderProps {}

export const FullScreenLoader: FC<FullScreenLoaderProps> = () => {
	return (
		<div className={classNames.container} style={{ backgroundColor: 'transparent' }}>
			<RaceBy color="var(--color-primary-500)" />
		</div>
	)
}
