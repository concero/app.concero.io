import classNames from './IconWrapper.module.pcss'
import { type ReactNode } from 'react'

export const IconWrapper = ({ children }: { children: ReactNode }) => {
	return <div className={classNames.wrapper}>{children}</div>
}
