import { useState } from 'react'
import axios from 'axios'
import { Card } from '../../cards/Card/Card'
import ProductSelect from '../FeedbackScreen/ProductSelect/ProductSelect'
import { Input } from './Input/Input'
import classNames from './FeedbackScreen.module.pcss'
import { Button } from '../../buttons/Button/Button'
import { SuccessModal } from './SuccessModal/SuccessModal'

interface ContactModalProps {
	show: boolean
	title: string
	body?: string
	isMessageNeeded?: boolean
}

const products = [{ title: 'Lanca' }, { title: 'CERP (Rewards)' }, { title: 'CELP (Pools)' }]

export function FeedbackScreen({ show, title, body, isMessageNeeded = true }: ContactModalProps) {
	const [inputs, setInputs] = useState({
		email: '',
		walletAddress: '',
		message: '',
	})
	const [errors, setErrors] = useState({
		email: false,
		walletAddress: false,
		message: false,
		product: false,
	})

	const [activeItem, setActiveItem] = useState<{ title: string } | null>(null)
	const [isModalVisible, setIsModalVisible] = useState(false)

	async function handleSubmit(e: any) {
		e.preventDefault()

		const newErrors = {
			email: !inputs.email,
			walletAddress: !inputs.walletAddress,
			message: !inputs.message || inputs.message.length < 100,
			product: !activeItem || activeItem.title === 'Select a product',
		}

		setErrors(newErrors)

		if (Object.values(newErrors).some(Boolean)) {
			return
		}

		try {
			const response = await axios({
				method: 'POST',
				url: 'https://send.concero.io/api/v1/client/cltkp48yy0009swvupzjn5ezi/responses',
				data: {
					surveyId: 'clu2fnr98001gmiks31g00uml',
					userId: inputs.email,
					finished: true,
					data: {
						email: inputs.email,
						walletAddress: inputs.walletAddress,
						product: activeItem?.title,
						message: inputs.message,
					},
				},
			})

			console.log(response.data)

			setIsModalVisible(true)
		} catch (err) {
			console.error('Error submitting form:', err)
			setIsModalVisible(true)
		} finally {
			setInputs({
				email: '',
				walletAddress: '',
				message: '',
			})
			setActiveItem(null)
		}
	}

	return (
		<div className={classNames.feedbackScreenContainer}>
			<Card className={classNames.card}>
				<div className={classNames.cardHeadingContainer}>
					<div className={classNames.titleContainer}>
						<h2>Leave Feedback</h2>
					</div>
				</div>
				<div className={classNames.inputsContainer}>
					<Input
						title={'Email'}
						placeholder={'your@email.com'}
						type={'text'}
						onChange={e => {
							setInputs({ ...inputs, email: e.target.value })
						}}
						value={inputs.email}
						error={errors.email ? 'Invalid email' : ''}
						className={errors.email ? classNames.inputError : ''}
					/>
					<Input
						title={'Wallet address'}
						placeholder={'0xConcero'}
						type={'text'}
						onChange={e => {
							setInputs({ ...inputs, walletAddress: e.target.value })
						}}
						value={inputs.walletAddress}
						error={errors.walletAddress ? 'Invalid wallet address' : ''}
						className={errors.walletAddress ? classNames.inputError : ''}
					/>
					<div className={classNames.productSelectContainer}>
						<p>Product</p>
						<ProductSelect
							products={products}
							activeItem={activeItem || { title: 'Select a product' }}
							setActiveItem={setActiveItem}
							error={errors.product ? 'Please select a product' : ''}
						/>
					</div>
					<Input
						title={'Message'}
						placeholder={'Your message must be at least 100 symbols'}
						inputType={'textarea'}
						onChange={e => {
							setInputs({ ...inputs, message: e.target.value })
						}}
						value={inputs.message}
						error={errors.message ? 'Message is too short. Minimum count is 100 symbols' : ''}
						className={errors.message ? classNames.inputError : ''}
						style={{ paddingTop: '16px', height: '128px', textAlign: 'left' }}
					/>
					{errors.message ? (
						errors.message
					) : (
						<div className={classNames.hintContainer}>
							<p>
								Describe your problem or suggestion. Don’t worry to be very detailed. Most relevant and
								helpful feedbacks will be awarded by 25 CERs
							</p>
						</div>
					)}

					<Button className={classNames.submitButton} onClick={handleSubmit}>
						Send Feedback
					</Button>
				</div>
			</Card>
			<SuccessModal
				show={isModalVisible}
				onClose={() => {
					setIsModalVisible(false)
				}}
			/>
		</div>
	)
}
