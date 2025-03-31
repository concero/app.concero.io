/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react'
import { OTP } from './OTP'
import { useState } from 'react'

import Plus from '@/lib/assets/icons/monochrome/Plus.svg?react'
const meta: Meta<typeof OTP> = {
	component: OTP,
	tags: ['autodocs'],
	argTypes: {
		value: { control: 'text', description: 'Value of the OTP input' },
		numInputs: { control: 'number', description: 'Number of OTP inputs', defaultValue: 4 },
		onChange: { action: 'changed', description: 'Callback when OTP changes' },
		onPaste: { action: 'pasted', description: 'Callback when content is pasted' },
		shouldAutoFocus: { control: 'boolean', description: 'Auto-focus the first input', defaultValue: true },
		placeholder: { control: 'text', description: 'Placeholder for inputs' },
		renderSeparator: { control: 'text', description: 'Separator between inputs' },
		inputType: {
			control: 'select',
			options: ['text', 'tel', 'number'],
			description: 'Type of the input fields',
			defaultValue: 'text',
		},

		isError: { control: 'boolean', description: 'Error true/false', defaultValue: false },
	},
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
	render: args => {
		const [{ otp, numInputs, placeholder, inputType }, setConfig] = useState({
			otp: '',
			numInputs: 5,
			separator: '-',
			placeholder: '-----',
			inputType: 'number' as const,
		})

		const handleOTPChange = (otp: string) => {
			setConfig(prevConfig => ({ ...prevConfig, otp }))
		}

		return (
			<OTP
				isError={args?.isError}
				numInputs={numInputs}
				onChange={handleOTPChange}
				value={otp}
				placeholder={placeholder}
				inputType={inputType}
				shouldAutoFocus
			/>
		)
	},
}
export const PrimaryFull: Story = {
	args: {
		numInputs: 6,
	},

	render: args => {
		const [{ otp, numInputs, placeholder, inputType }, setConfig] = useState({
			otp: '',
			numInputs: 6,
			separator: '-',
			placeholder: '------',
			inputType: 'number' as const,
		})

		const handleOTPChange = (otp: string) => {
			setConfig(prevConfig => ({ ...prevConfig, otp }))
		}
		const additionalArgs = {
			icon: <Plus />,
			iconHint: <Plus />,
			hintText: 'Hint text',
			count: {
				max: 10,
			},
			labelText: 'Label',
			subLabelText: 'Help text',
		}
		return (
			<OTP
				isError={args?.isError}
				numInputs={numInputs}
				onChange={handleOTPChange}
				value={otp}
				placeholder={placeholder}
				inputType={inputType}
				shouldAutoFocus
				{...additionalArgs}
			/>
		)
	},
}
