import { ReactNode } from 'react'
import cls from './Banner.module.pcss'
import clsx from 'clsx'

type TProps = {
	className?: string
	children?: ReactNode
}
export const Banner = ({ children, className }: TProps) => {
	return <div className={clsx(cls.wrap, className)}>{children}</div>
}
