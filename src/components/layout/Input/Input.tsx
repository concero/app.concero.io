import classNames from './Input.module.pcss'
import { type FC } from 'react'

interface InputProps {
	type: 'text' | 'email' | 'password'
	title?: string
	placeholder: string
	value?: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	inputType?: 'input' | 'textarea'
	className?: string
}

export const Input: FC<InputProps> = ({
	type,
	placeholder,
	value,
	onChange,
	title,
	inputType = 'input',
	className,
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
		</div>
	)
}
