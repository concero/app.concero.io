import cls from './OTP.module.pcss'
import React, { ReactNode, useCallback, useEffect, useRef } from 'react'
import { Input, TInputSize } from '../Input/Input'
import { MetaInput } from '../MetaInput/MetaInput'
import clsx from 'clsx'

type TAllowedInputTypes = 'password' | 'text' | 'number' | 'tel'
export type TOTPProps = {
	/** Value of the OTP input */
	value?: string
	/** Number of OTP inputs to be rendered */
	numInputs?: number
	/** Callback to be called when the OTP value changes */
	onChange: (otp: string) => void
	/** Callback to be called when pasting content into the component */
	onPaste?: (event: React.ClipboardEvent<HTMLDivElement>) => void
	/** Whether the first input should be auto focused */
	shouldAutoFocus?: boolean
	/** Placeholder for the inputs */
	placeholder?: string
	/** Function to render the separator */
	renderSeparator?: ((index: number) => React.ReactNode) | React.ReactNode
	/** The type that will be passed to the input being rendered */
	inputType?: TAllowedInputTypes
	isError?: boolean
	classNameWrap?: string
	size?: TInputSize
	iconHint?: React.ReactNode
	labelText?: string
	subLabelText?: string
	hintText?: string | ReactNode
	isDisabled?: boolean
	isSuccess?: boolean
}

/**This solution is taken from [https://github.com/devfolioco/react-otp-input/blob/main/example/src/App.tsx].
 * It's a temporary fix with some drawbacks, but it works. */
/**
  TODO:
	1. Implement deletion with cursor movement. + 
	2. Set up cursor movement using arrow keys.
	3. Ensure that focus state works correctly.
	4. Add Ctrl+Z for undoing the last insertion.
 */
export const OTP = ({
	isDisabled,
	size = 'l',
	value = '',
	numInputs = 4,
	onChange,
	onPaste,
	shouldAutoFocus = false,
	inputType = 'number',
	renderSeparator,
	placeholder,
	isError,
	classNameWrap,
	iconHint,
	labelText,
	subLabelText,
	hintText,
	isSuccess,
}: TOTPProps) => {
	const [activeInput, setActiveInput] = React.useState(0)
	const inputRefs = useRef<Array<HTMLInputElement | null>>([])
	const OTPContainerRef = useRef<HTMLDivElement>(null)
	const getOTPValue = useCallback(() => (value ? value.toString().split('') : []), [value])

	const isInputNum = inputType === 'number' || inputType === 'tel'

	const focusInput = useCallback(
		(index: number) => {
			const activeInput = Math.max(Math.min(numInputs - 1, index), 0)

			if (inputRefs.current[activeInput]) {
				inputRefs.current[activeInput]?.focus()
				inputRefs.current[activeInput]?.select()
				setActiveInput(activeInput)
			}
		},
		[numInputs],
	)
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (OTPContainerRef.current && !OTPContainerRef.current.contains(event.target as Node)) {
				setActiveInput(-1)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])
	React.useEffect(() => {
		inputRefs.current = inputRefs.current.slice(0, numInputs)
	}, [numInputs])

	React.useEffect(() => {
		if (shouldAutoFocus) {
			focusInput(0)
		}
	}, [focusInput, shouldAutoFocus])

	const getPlaceholderValue = () => {
		if (typeof placeholder === 'string') {
			if (placeholder.length === numInputs) {
				return placeholder
			}

			if (placeholder.length > 0) {
				console.error('Length of the placeholder should be equal to the number of inputs.')
			}
		}
		return undefined
	}

	const isInputValueValid = (value: string) => {
		const isTypeValid = isInputNum ? !isNaN(Number(value)) : typeof value === 'string'
		return isTypeValid && value.trim().length === 1
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target

		if (isInputValueValid(value)) {
			changeCodeAtFocus(value)
			focusInput(activeInput + 1)
		}
	}

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { nativeEvent } = event
		const value = event.target.value

		if (!isInputValueValid(value)) {
			// Pasting from the native autofill suggestion on a mobile device can pass
			// the pasted string as one long input to one of the cells. This ensures
			// that we handle the full input and not just the first character.
			if (value.length === numInputs) {
				const hasInvalidInput = value.split('').some(cellInput => !isInputValueValid(cellInput))
				if (!hasInvalidInput) {
					handleOTPChange(value.split(''))
					focusInput(numInputs - 1)
				}
			}

			// @ts-expect-error - This was added previously to handle and edge case
			// for dealing with keyCode "229 Unidentified" on Android. Check if this is
			// still needed.
			if (nativeEvent.data === null && nativeEvent.inputType === 'deleteContentBackward') {
				event.preventDefault()
				changeCodeAtFocus('')
				focusInput(activeInput - 1)
			}

			// Clear the input if it's not valid value because firefox allows
			// pasting non-numeric characters in a number type input
			event.target.value = ''
		}
	}

	const changeCodeAtFocus = (value: string) => {
		const otp = getOTPValue()
		otp[activeInput] = value[0]
		handleOTPChange(otp)
	}

	const handleOTPChange = (otp: Array<string>) => {
		const otpValue = otp.join('')
		onChange?.(otpValue)
	}

	const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
		event.preventDefault()

		const otp = getOTPValue()
		let nextActiveInput = activeInput

		// Get pastedData in an array of max size (num of inputs - current position)
		const pastedData = event.clipboardData
			.getData('text/plain')
			.slice(0, numInputs - activeInput)
			.split('')

		if (isInputNum && pastedData.some(value => isNaN(Number(value)))) {
			return
		}

		// Paste data from focused input onwards
		for (let pos = 0; pos < numInputs; ++pos) {
			if (pos >= activeInput && pastedData.length > 0) {
				otp[pos] = pastedData.shift() ?? ''
				nextActiveInput++
			}
		}

		focusInput(nextActiveInput)
		handleOTPChange(otp)
	}
	const sizeMap: Record<TInputSize, string> = {
		m: cls.size_m,
		l: cls.size_l,
		xl: cls.size_xl,
	}

	return (
		<MetaInput
			classNameWrap={classNameWrap}
			hintText={hintText}
			iconHint={iconHint}
			isError={isError}
			isSuccess={isSuccess}
			labelText={labelText}
			subLabelText={subLabelText}
		>
			<div className={cls.otp_container} onPaste={onPaste}>
				{Array.from({ length: numInputs }, (_, index) => index).map(index => (
					<React.Fragment key={index}>
						<Input
							isDisabled={isDisabled}
							value={getOTPValue()[index] ?? ''}
							placeholder={getPlaceholderValue()?.[index] ?? undefined}
							ref={element => (inputRefs.current[index] = element)}
							onChange={handleChange}
							onClick={() => focusInput(index)}
							inputProps={{
								onPaste: handlePaste,
								autoComplete: 'off',
								'aria-label': `Please enter OTP character ${index + 1}`,
								type: 'text',
								onInput: handleInputChange,
								inputMode: isInputNum ? 'numeric' : 'text',
							}}
							isPressed={activeInput === index}
							isError={isError}
							className={clsx(cls.otp_input, sizeMap[size])}
							size={size}
						/>
						{index < numInputs - 1 &&
							(typeof renderSeparator === 'function' ? renderSeparator(index) : renderSeparator)}
					</React.Fragment>
				))}
			</div>
		</MetaInput>
	)
}
