import { type FC, useState, type MouseEvent, HTMLProps } from 'react'
import cls from './Checkbox.module.pcss'
import { classNames } from '../../../utils/classNames/classNames'

type TProps = {
	isChecked?: boolean
	onChange?: (isChecked: boolean) => void
	className?: string
	disabled?: boolean
} & HTMLProps<HTMLDivElement>

export const Checkbox = (props: TProps) => {
	const { className, disabled, isChecked, onChange } = props
	const [internalChecked, setInternalChecked] = useState(false)

	const handleClick = (event: MouseEvent<HTMLDivElement>) => {
		if (disabled) return
		const nextChecked = isChecked ?? !internalChecked
		setInternalChecked(!internalChecked)
		onChange?.(nextChecked)
	}

	return (
		<div
			className={classNames(
				cls.checkbox,
				{
					[cls.checked]: isChecked ?? internalChecked,
					[cls.disabled]: disabled,
				},
				[className],
			)}
			aria-disabled={disabled}
			onClick={handleClick}
			tabIndex={0}
			role="checkbox"
			aria-checked={isChecked ?? internalChecked}
		>
			<div className={cls.inner}></div>
		</div>
	)
}
