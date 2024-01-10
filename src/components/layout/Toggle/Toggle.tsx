import { type FC } from 'react'
import classNames from './Toggle.module.pcss'

interface ToggleProps {
	isChecked: boolean
	onChange: (checked: boolean) => void
	className?: string
}

export const Toggle: FC<ToggleProps> = ({ isChecked, onChange, className }) => {
	return (
		<div
			className={`${classNames.toggleContainer} ${isChecked ? classNames.checked : ''} ${className || ''}`}
			onClick={() => {
				onChange(!isChecked)
			}}
		>
			<div className={`${classNames.slider} ${isChecked ? classNames.checked : ''}`}></div>
		</div>
	)
}
