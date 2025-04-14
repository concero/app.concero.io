import clsx from 'clsx'
import cls from './Input.module.pcss'
import { ComponentProps, forwardRef, ReactNode, useEffect, useId, useRef, useState } from 'react'
import { MetaInput } from '../MetaInput/MetaInput'
import { useCombinedRef } from '@/shared/lib/hooks/useCombinedRef'
export type TInputSize = 'm' | 'l' | 'xl'
type TClassname = string
type TCountConfig = {
	max?: number
	strategy?: (value: string) => number
}
export type TInputProps = {
	className?: string
	classNameWrap?: string
	size?: TInputSize
	icon?: React.ReactNode
	iconHint?: React.ReactNode
	placeholder?: string
	labelText?: string
	subLabelText?: string
	count?: TCountConfig
	hintText?: string | ReactNode
	value?: string
	id?: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	isDisabled?: boolean
	isHovered?: boolean
	isPressed?: boolean
	isFocused?: boolean
	isError?: boolean
	isSuccess?: boolean
	onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
	inputProps?: Omit<
		ComponentProps<'input'>,
		'className' | 'onClick' | 'ref' | 'onChange' | 'placeholder' | 'value' | 'id'
	>
}
/**
 * TODO:
 * 1. Need to implement supported text formats, numbers, and characters.
 * 2. Add support falsy states for isPressed/isActive/isDisabled/isHovered/isFocused/isError.
 * - For example disable border changing on isPressed - false
 * */
export const Input = forwardRef<HTMLInputElement, TInputProps>((props, ref) => {
	const {
		className,
		classNameWrap,
		size = 'm',
		icon,
		iconHint,
		placeholder,
		labelText,
		subLabelText,
		count,
		hintText,
		value,
		onChange,
		id,
		isDisabled = false,
		isHovered,
		isPressed,
		isFocused,
		isError,
		isSuccess,
		onClick,
		inputProps,
	} = props

	//Inner states
	const [innerValue, setInnerValue] = useState(value ?? '')
	const [innerIsActive, setInnerIsActive] = useState(false)

	const counterRef = useRef(0)
	const inputRef = useRef<HTMLInputElement>(null)
	const wrapperRef = useRef<HTMLDivElement>(null)
	const combinedRef = useCombinedRef(ref, inputRef)
	const inputGeneratedId = useId()
	const inputId = id ?? inputGeneratedId
	const isLocalFocused = isFocused || document.activeElement === inputRef.current

	const showPlacholder = !innerIsActive && !isLocalFocused

	//The counting is done outside the functions, in the component body,
	// so that if onChange returns the same string, the counter does not increment.
	const valueForCount = value ?? innerValue
	if (count?.strategy) {
		counterRef.current = count.strategy(valueForCount)
	} else {
		counterRef.current = valueForCount.length
	}
	// Handlers
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!isDisabled) {
			const value = e.target.value
			setInnerIsActive(true)
			setInnerValue(value)
			onChange?.(e)
		}
	}
	const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (!isDisabled && inputRef.current) {
			inputRef.current.focus()
		}

		onClick?.(e)
	}

	const handleMouseDown = () => {
		if (!isDisabled) {
			setInnerIsActive(true)
		}
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
				setInnerIsActive(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])
	const sizeMap: Record<TInputSize, TClassname> = {
		m: cls.size_m,
		l: cls.size_l,
		xl: cls.size_xl,
	}

	return (
		<div className={clsx(cls.input_wrap, classNameWrap)}>
			<MetaInput
				classNameWrap={classNameWrap}
				count={count}
				hintText={hintText}
				iconHint={iconHint}
				isError={isError}
				isSuccess={isSuccess}
				labelText={labelText}
				subLabelText={subLabelText}
			>
				<div
					ref={wrapperRef}
					tabIndex={isDisabled ? -1 : 0}
					role="textbox"
					aria-invalid={isError}
					aria-disabled={isDisabled}
					aria-label={placeholder || 'Text input'}
					onKeyDown={e => {
						if (!isDisabled && inputRef.current) {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault()
							}
							inputRef.current.focus()
						}
					}}
					onMouseDown={handleMouseDown}
					className={clsx(
						cls.input_field,
						sizeMap[size],
						{
							[cls.is_hovered]: isHovered,
							[cls.is_pressed]: isPressed !== undefined ? isPressed : isPressed || innerIsActive,
							[cls.is_focused]: isFocused,
							[cls.is_disabled]: isDisabled,
							[cls.is_error]: isError,
						},

						className,
					)}
					onClick={handleClick}
				>
					<input
						tabIndex={-1}
						id={inputId}
						spellCheck={false}
						value={value ?? innerValue}
						onChange={handleChange}
						type="text"
						ref={combinedRef}
						className={cls.input}
						placeholder={showPlacholder ? placeholder : ''}
						{...inputProps}
					/>
					{icon && <div className={cls.icon}>{icon}</div>}
				</div>
			</MetaInput>
		</div>
	)
})
