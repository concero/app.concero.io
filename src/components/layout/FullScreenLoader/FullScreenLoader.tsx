import { type FC, useContext } from 'react'
import { RaceBy } from '@uiball/loaders'
import classNames from './FullScreenLoader.module.pcss'
import { ThemeContext } from '../../../hooks/themeContext'

export interface FullScreenLoaderProps {}

export const FullScreenLoader: FC<FullScreenLoaderProps> = () => {
	const { theme } = useContext(ThemeContext)

	return (
		<div className={classNames.container} style={{ backgroundColor: theme === 'dark' ? '#000' : '#fff' }}>
			<RaceBy color="var(--color-primary-500)" />
		</div>
	)
}
