import classNames from './Input.module.pcss'
import { type FC } from 'react'
import { IconAlertCircle } from '@tabler/icons-react' // Corrected import

interface InputProps {
	type: 'text' | 'email' | 'password'
	title?: string
	placeholder: string
	value?: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	inputType?: 'input' | 'textarea'
	className?: string
	error?: string // Add error property
}

export const Input: FC<InputProps> = ({
	type,
	placeholder,
	value,
	onChange,
	title,
	inputType = 'input',
	className,
	error, // Destructure error property
}) => {
	return (
		<div className={classNames.container}>
			{title ? <p className={`body2 ${classNames.title}`}>{title}</p> : null}
			{inputType === 'textarea' ? (
				<textarea className={classNames.textarea} placeholder={placeholder} value={value} onChange={onChange} />
			) : (
				<input
					className={`${classNames.input} ${className}`}
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
			)}
			{error && (
				<div className={classNames.errorMessage}>
					<IconAlertCircle size={16} color="var(--color-danger-700)"></IconAlertCircle>
					<span>{error}</span>
				</div>
			)}
		</div>
	)
}
