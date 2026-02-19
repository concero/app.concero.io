import { type FC, type ReactNode } from 'react'
import classNames from './Card.module.pcss'
/**@deprecated */
interface CardProps {
	children: ReactNode
	className?: string
	onClick?: () => void
}
/**@deprecated */
export const Card: FC<CardProps> = ({ children, className, onClick }) => (
	<div className={`${classNames.card} ${className}`} onClick={onClick && onClick}>
		{children}
	</div>
)
