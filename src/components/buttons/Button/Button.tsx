import { type FC } from 'react'
import { type ButtonProps } from './types'
import { LoadingAnimation } from '../../layout/LoadingAnimation/LoadingAnimation'
import { getButtonClasses } from './getButtonClasses'

export const Button: FC<ButtonProps> = ({ size = 'md', variant = 'primary', leftIcon, rightIcon, isLoading, isDisabled, children, onClick, className }) => {
	const buttonClasses = getButtonClasses(size, variant, isLoading, isDisabled, className)

	return (
		<button className={buttonClasses} onClick={onClick} aria-label={variant + size}>
			{isLoading ? <LoadingAnimation /> : leftIcon}
			{children}
			{rightIcon}
		</button>
	)
}
