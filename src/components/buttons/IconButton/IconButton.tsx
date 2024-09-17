import styles from './IconButton.module.pcss'
import { type MouseEventHandler, type ReactNode } from 'react'

interface Props {
	isDisabled?: boolean
	children: ReactNode
	onClick?: MouseEventHandler<HTMLButtonElement> | undefined
	className?: string
	size?: 'sm' | 'md' | 'lg'
	variant?: 'default' | 'secondary' | 'secondaryColor' | 'tetrary' | 'tetraryColor'
}

export const IconButton = ({
	size = 'md',
	variant = 'default',
	isDisabled = false,
	children,
	onClick,
	className,
}: Props) => {
	const classSize = styles[size]
	const classVariant = styles[variant]
	return (
		<button
			disabled={isDisabled}
			onClick={onClick}
			className={`${className} ${classSize} ${classVariant} ${styles.button}`}
		>
			<span className={styles.svg}>{children}</span>
		</button>
	)
}
