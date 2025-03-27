import { ReactNode, useState } from 'react'
import { TUserResponse } from '../../model/types/response'
import cls from './EmailConnectModal.module.pcss'
import { Button, Input } from '@concero/ui-kit'

const StepOne = ({ onSuccessSend }: { onSuccessSend?: () => void }) => {
	const [emailInput, setEmailInput] = useState<string>()

	return (
		<div className={cls.wrap_first_step}>
			<div className={cls.wrap_info_content}>
				<div className={cls.step}>Step 1 of 2</div>
				<div className={cls.wrap_info}>
					<span className={cls.title}>Enter your email addres</span>
					<span className={cls.description}>Enter your email to receive your authentication code</span>
				</div>
				<Input
					size="l"
					placeholder="your@email.com"
					onChange={e => {
						setEmailInput(e.target.value)
					}}
				/>
			</div>
			<Button size="l" isFull variant="secondary_color">
				Send verification code
			</Button>
		</div>
	)
}
const StepTwo = ({ onSuccessVerify }: { onSuccessVerify?: () => void }) => {
	const [optInput, setOtpInput] = useState<string>()

	return (
		<div className={cls.wrap_second_step}>
			<div className={cls.wrap_info_content}>
				<div className={cls.step}>Step 2 of 2</div>
				<div className={cls.wrap_info}>
					<span className={cls.title}>Verify your email</span>
					<span className={cls.description}>Enter the 6-digit code Concero just sent to user@mail.com</span>
				</div>
				<Input.OTP onChange={setOtpInput} />
			</div>
			<div className={cls.controls}>
				<Button size="l" isFull variant="secondary_color">
					Send verification code
				</Button>
				<Button size="l" isFull variant="tetrary">
					Send again
				</Button>
			</div>
		</div>
	)
}

type TProps = {
	user: TUserResponse
	onSuccessConnect?: () => void
}
type TStep = '0' | '1'
export const EmailConnectModal = (props: TProps) => {
	const { user, onSuccessConnect } = props
	const [currentStep, setCurrentStep] = useState<TStep>('0')

	const stepMap: Record<TStep, JSX.Element> = {
		0: (
			<StepOne
				onSuccessSend={() => {
					setCurrentStep('1')
				}}
			/>
		),
		1: (
			<StepTwo
				onSuccessVerify={() => {
					onSuccessConnect?.()
				}}
			/>
		),
	}

	return <div className={cls.wrap_connect_email}>{stepMap[currentStep]}</div>
}
