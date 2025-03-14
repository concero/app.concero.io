import { ReactNode } from 'react'
import cls from './PageWrap.module.pcss'
import clsx from 'clsx'
export const PageWrap = ({ children, className }: { children: ReactNode; className?: string }) => {
	return <div className={clsx(cls.page, className)}>{children}</div>
}
