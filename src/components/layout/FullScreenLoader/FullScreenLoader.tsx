import { FC } from 'react'
import { RaceBy } from '@uiball/loaders'
import classNames from './FullScreenLoader.module.pcss'

export interface FullScreenLoaderProps {}

export const FullScreenLoader: FC<FullScreenLoaderProps> = () => {
	// determine system theme (light or dark with js)
	function getSystemTheme() {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			return 'dark'
		}
		return 'light'
	}

	return (
		<div className={classNames.container} style={{ backgroundColor: getSystemTheme() === 'dark' ? '#000' : '#fff' }}>
			<RaceBy color="var(--color-primary-500)" />
		</div>
	)
}
