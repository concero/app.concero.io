import { type FC } from 'react'
import classNames from './Toggle.module.pcss'

interface ToggleProps {
	isChecked: boolean
	onChange: (checked: boolean) => void
	className?: string
	checkedClassName?: string
}
/**@deprecated use from '@concero/ui-kit' */
export const Toggle: FC<ToggleProps> = ({ isChecked, onChange, className, checkedClassName = '' }) => {
	return (
		<div
			className={`${classNames.toggleContainer} ${isChecked ? `${classNames.checked} ${checkedClassName}` : ''} ${
				className || ''
			}`}
			onClick={() => {
				onChange(!isChecked)
			}}
		>
			<div className={`${classNames.slider} ${isChecked ? classNames.checked : ''}`}></div>
		</div>
	)
}
