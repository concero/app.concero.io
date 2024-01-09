import { type ButtonProps } from './types'
import styles from './Button.module.pcss'

export function getButtonClasses(
	size: ButtonProps['size'],
	variant: ButtonProps['variant'],
	isLoading: ButtonProps['isLoading'],
	isDisabled: ButtonProps['isDisabled'],
	className: ButtonProps['className'],
) {
	const baseClasses = [styles.button]
	const sizeClass = size ? styles[size] : ''
	const variantClass = variant ? styles[variant] : ''
	const isLoadingClass = isLoading ? styles.isLoading : ''
	const isDisabledClass = isDisabled ? styles.isDisabled : ''
	const additionalClasses = className?.split(' ')
	return baseClasses.concat(sizeClass, variantClass, isLoadingClass, isDisabledClass, additionalClasses).join(' ')
}
