import { type ButtonProps } from './types'
import styles from './Button.module.pcss'

export function getButtonClasses(
	size: ButtonProps['size'],
	variant: ButtonProps['variant'],
	isLoading: ButtonProps['isLoading'],
	isDisabled: ButtonProps['isDisabled'],
	isFull: ButtonProps['isFull'],
	className: ButtonProps['className'],
) {
	const baseClasses = [styles.button]
	const sizeClass = size ? styles[size] : ''
	const variantClass = variant ? styles[variant] : ''
	const isLoadingClass = isLoading ? styles.isLoading : ''
	const isDisabledClass = isDisabled ? styles.isDisabled : ''
	const isFullClass = isFull ? styles.fullButton : ''

	const additionalClasses = className?.split(' ')
	return baseClasses
		.concat(additionalClasses, sizeClass, variantClass, isLoadingClass, isDisabledClass, isFullClass)
		.join(' ')
}
