import { type FC, type ReactNode } from 'react'

interface CardProps {
	children: ReactNode
	className?: string
	onClick?: () => void
}

export const Card: FC<CardProps> = ({ children, className, onClick }) => (
	<div className={`card ${className}`} onClick={onClick && onClick}>
		{children}
	</div>
)
