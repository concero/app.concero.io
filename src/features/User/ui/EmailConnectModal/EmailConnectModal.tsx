import { ReactNode, useRef, useState } from 'react'
import cls from './EmailConnectModal.module.pcss'
import { Button, IconButton, Input, Modal } from '@concero/ui-kit'
import { useSendEmailMutation, useVerifyOTPMutation } from '@/entities/User/api/userApi'
import { Address } from 'viem'

import WarningIcon from '@/shared/assets/icons/monochrome/warning.svg?react'
import CrossIcon from '@/shared/assets/icons/monochrome/CrossClose.svg?react'
import ArrowLeftIcon from '@/shared/assets/icons/monochrome/ArrowLeft.svg?react'
import { TUserResponse } from '@/entities/User'

const StepOne = ({ onSuccessSend, user }: { onSuccessSend?: () => void; user: TUserResponse }) => {
	const emailRef = useRef('')
	const { mutateAsync, isPending, isError, reset } = useSendEmailMutation()
	const handleSend = () => {
		mutateAsync({ address: user.address as Address, email: emailRef.current }).then(res => {
			if (res) {
				onSuccessSend?.()
			}
		})
	}
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
						emailRef.current = e.target.value
						reset()
					}}
					isError={isError}
					iconHint={isError ? <WarningIcon /> : null}
					hintText={isError ? 'Email is not correct' : null}
				/>
			</div>
			<Button
				size="l"
				isFull
				variant="secondary_color"
				onClick={handleSend}
				isDisabled={emailRef.current.length < 1 || isPending}
			>
				Send verification code
			</Button>
		</div>
	)
}
const StepTwo = ({ onSuccessVerify, user }: { onSuccessVerify?: () => void; user: TUserResponse }) => {
	const [{ otp, numInputs, placeholder, inputType }, setConfig] = useState({
		otp: '',
		numInputs: 6,
		separator: '-',
		placeholder: '------',
		inputType: 'number' as const,
	})
	const { mutateAsync, isPending, isError, reset } = useVerifyOTPMutation()
	const handleSend = () => {
		mutateAsync({ address: user.address as Address, otp }).then(res => {
			if (res) {
				onSuccessVerify?.()
			}
		})
	}

	const handleOTPChange = (otp: string) => {
		setConfig(prevConfig => ({ ...prevConfig, otp }))
	}
	return (
		<div className={cls.wrap_second_step}>
			<div className={cls.wrap_info_content}>
				<div className={cls.step}>Step 2 of 2</div>
				<div className={cls.wrap_info}>
					<span className={cls.title}>Verify your email</span>
					<span className={cls.description}>Enter the 6-digit code Concero just sent to user@mail.com</span>
				</div>
				<Input.OTP
					numInputs={numInputs}
					onChange={value => {
						handleOTPChange(value)
						reset()
					}}
					value={otp}
					placeholder={placeholder}
					isError={isError}
					size="l"
					inputType={inputType}
					classNameWrap={cls.otp_input_wrap}
					iconHint={isError ? <WarningIcon /> : null}
					hintText={isError ? 'Email is not correct' : null}
				/>
			</div>
			<div className={cls.controls}>
				<Button
					size="l"
					isFull
					variant="secondary_color"
					onClick={handleSend}
					isDisabled={isPending || isError}
				>
					Verify
				</Button>
				<Button size="l" isFull variant="tetrary">
					Send again
				</Button>
			</div>
		</div>
	)
}

type TProps = {
	show: boolean
	onClose: () => void
	user: TUserResponse
}
type TStep = '0' | '1'
export const EmailConnectModal = (props: TProps) => {
	const { user, onClose, show } = props
	const [currentStep, setCurrentStep] = useState<TStep>('0')

	const stepMap: Record<TStep, JSX.Element> = {
		0: (
			<StepOne
				user={user}
				onSuccessSend={() => {
					setCurrentStep('1')
				}}
			/>
		),
		1: (
			<StepTwo
				user={user}
				onSuccessVerify={() => {
					onClose()
				}}
			/>
		),
	}

	return (
		<Modal show={show} onClose={onClose} headless>
			<div className={cls.wrap_connect_email}>
				<div className={cls.wrap_header_modal}>
					<div>
						{currentStep === '1' ? (
							<IconButton size="m" variant="tetrary" onClick={() => setCurrentStep('0')}>
								<ArrowLeftIcon />
							</IconButton>
						) : null}
					</div>
					<h2 className={cls.title}>Connect your email</h2>
					<IconButton size="m" variant="secondary" onClick={onClose}>
						<CrossIcon />
					</IconButton>
				</div>
				{stepMap[currentStep]}
			</div>
		</Modal>
	)
}
