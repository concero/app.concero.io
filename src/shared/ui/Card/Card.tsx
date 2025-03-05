import { HTMLProps, PropsWithChildren, type FC, type ReactNode } from 'react'
import classNames from './Card.module.pcss'
type CardProps = PropsWithChildren<React.AllHTMLAttributes<HTMLDivElement>>
export const Card = ({ children, className, onClick, ...otherProps }: CardProps) => (
	<div className={`${classNames.card} ${className}`} onClick={onClick && onClick} {...otherProps}>
		{children}
	</div>
)
