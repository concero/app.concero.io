import React, { type FC, type ForwardedRef, forwardRef, type ReactNode, useEffect, useRef, useState } from 'react'
import classNames from './TextInput.module.pcss'

export interface TextInputProps {
	value?: string
	placeholder: string
	onChangeText?: (value: string) => void
	icon: ReactNode
	variant?: 'default' | 'inline'
	isDisabled?: boolean
	title?: string
	type?: string
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const TextInput: FC<TextInputProps & { ref?: ForwardedRef<HTMLInputElement> }> = forwardRef<HTMLInputElement, TextInputProps>(
	({ value, placeholder, onChangeText = null, icon = null, variant, isDisabled = false, title = null, type = 'text', ...rest }, ref) => {
		const inputRef = useRef()
		const [isFocused, setIsFocused] = useState<boolean>(false)
		const inputClass = variant === 'inline' && !title ? '' : classNames.inputWrapper
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

		const handleKeyDown = (event: KeyboardEvent) => {
			if (inputRef.current && !isFocused) {
				inputRef.current.focus()
			}
		}
		useEffect(() => {
			document.addEventListener('keydown', handleKeyDown)

			return () => {
				document.removeEventListener('keydown', handleKeyDown)
			}
		}, [isFocused])

		return (
			<div className={`${inputClass} ${isFocused ? classNames.focused : ''}`} onClick={handleAreaClick}>
				{title ? <p className="body1">{title}</p> : null}
				<input
					ref={ref ?? inputRef}
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
