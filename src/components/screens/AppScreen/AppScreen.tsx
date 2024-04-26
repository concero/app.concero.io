import { type FC, type ReactNode } from 'react'
import classNames from './AppScreen.module.pcss'

export interface AppScreenProps {
	children?: ReactNode
}

export const AppScreen: FC<AppScreenProps> = ({ children }) => {
	return <div className={`${classNames.container} ${classNames.abTestNewSwapCardLayoutContainer}`}>{children}</div>
}
