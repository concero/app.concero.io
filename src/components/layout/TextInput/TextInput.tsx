import React, { type ChangeEvent, type FC, forwardRef, type ReactNode, useEffect, useRef, useState } from 'react'
import classNames from './TextInput.module.pcss'

export interface TextInputProps {
	value?: string
	placeholder: string
	onChangeText?: (value: string) => void
	icon?: ReactNode
	variant?: 'default' | 'inline'
	isDisabled?: boolean
	title?: string
	type?: string
	wrapperClassName?: string
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export const TextInput: FC<TextInputProps> = forwardRef<HTMLInputElement, TextInputProps>(
	(
		{
			value,
			placeholder,
			onChangeText = null,
			icon = null,
			variant,
			isDisabled = false,
			title = null,
			type = 'text',
			wrapperClassName = '',
			...rest
		},
		ref,
	) => {
		const inputRef = useRef<HTMLInputElement>(null)
		const [isFocused, setIsFocused] = useState<boolean>(false)
		const inputClass = classNames.inputWrapper
		const handleFocus = () => {
			setIsFocused(true)
		}
		const handleBlur = () => {
			setIsFocused(false)
		}

		const handleAreaClick = () => {
			if (inputRef.current) inputRef.current.focus()
		}

		const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			onChangeText && onChangeText(event.target.value)
		}

		const handleKeyDown = () => {
			if (inputRef.current && !isFocused) {
				inputRef.current.focus()
			}
		}

		useEffect(() => {
			if (!ref) return

			document.addEventListener('keydown', handleKeyDown)

			return () => {
				document.removeEventListener('keydown', handleKeyDown)
			}
		}, [isFocused])

		return (
			<div
				className={`${wrapperClassName} ${inputClass} ${isFocused && variant === 'default' ? classNames.focused : ''}`}
				onClick={handleAreaClick}
			>
				{title ? <p className="body1">{title}</p> : null}
				<input
					ref={ref || inputRef}
					onFocus={handleFocus}
					onBlur={handleBlur}
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={handleChange}
					disabled={isDisabled}
					{...rest}
				/>
				{icon}
			</div>
		)
	},
)
TextInput.displayName = 'TextInput'
