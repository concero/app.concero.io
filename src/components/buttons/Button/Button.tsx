import { type FC } from 'react'
import { type ButtonProps } from './types'
import { getButtonClasses } from './getButtonClasses'
import classNames from './Button.module.pcss'
import { Loader } from '../../layout/Loader/Loader'

export const Button: FC<ButtonProps> = ({
	size = 'md',
	variant = 'primary',
	leftIcon,
	rightIcon,
	isLoading,
	isDisabled,
	children,
	onClick,
	className,
	isFull,
}) => {
	const buttonClasses = getButtonClasses(size, variant, isLoading, isDisabled, isFull, className)

	return (
		<button
			className={buttonClasses}
			id={classNames[variant]}
			disabled={isDisabled}
			onClick={!isDisabled ? onClick : undefined}
			aria-label={variant + size}
		>
			{!isLoading && leftIcon}
			<span className={classNames.innerButton}>{isLoading ? <Loader /> : children}</span>
			{!isLoading && rightIcon}
		</button>
	)
}
