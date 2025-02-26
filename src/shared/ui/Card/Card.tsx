import { type FC, type ReactNode } from 'react'
import classNames from './Card.module.pcss'
interface CardProps {
	children: ReactNode
	className?: string
	onClick?: () => void
}
export const Card = ({ children, className, onClick }: CardProps) => (
	<div className={`${classNames.card} ${className}`} onClick={onClick && onClick}>
		{children}
	</div>
)
