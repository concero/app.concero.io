// import { Modal } from '../../../layout/Modal/Modal'

import classNames from './FeedbackScreen.module.pcss'
import { Input } from '../../layout/Input/Input'
// import { Button } from '../../../layout/Button/Button'
import { useState } from 'react'
import axios from 'axios'
import { IconX } from '@tabler/icons-react'
import { Modal } from '../../modals/Modal/Modal'

interface ContactModalProps {
	show: boolean
	setShow: (show: boolean) => void
	title: string
	body?: string
	isMessageNeeded?: boolean
}

export function FeedbackScreen({ show, setShow, title, body, isMessageNeeded = true }: ContactModalProps) {
	const [inputs, setInputs] = useState({
		name: '',
		email: '',
		message: '',
		socialMedia: '',
	})

	// function handleSubmit(e: any) {
	// 	e.preventDefault()
	//
	// 	if (!inputs.name || !inputs.email) {
	// 		return
	// 	}
	//
	// 	// axios({
	// 	// 	method: 'POST',
	// 	// 	url: 'https://send.concero.io/api/v1/client/cltkp48yy0009swvupzjn5ezi/responses',
	// 	// 	data: {
	// 	// 		surveyId: 'clu2fnr98001gmiks31g00uml',
	// 	// 		userId: `${inputs.email}`,
	// 	// 		finished: true,
	// 	// 		data: {
	// 	// 			name: inputs.name,
	// 	// 			email: inputs.email,
	// 	// 			discordOrTwitterUsername: inputs.socialMedia,
	// 	// 			message: inputs.message,
	// 	// 		},
	// 	// 	},
	// 	// })
	// 	// 		.then(response => {
	// 	// 			console.log(response)
	// 	// 		})
	// 	// 		.catch(err => {
	// 	// 			console.log(err)
	// 	// 		})
	// 	// 		.finally(() => {
	// 	// 			setShow(false)
	// 	// 			setInputs({
	// 	// 				name: '',
	// 	// 				email: '',
	// 	// 				message: '',
	// 	// 				socialMedia: '',
	// 	// 			})
	// 	// 		})
	// }

	return (
		<Modal show={show} setShow={setShow}>
			<div className={classNames.container}>
				<div className={classNames.formContainer}>
					<div className={classNames.titleContainer}>
						<h2>{title}</h2>
						{body ? <p className={'body2'}>{body}</p> : null}
					</div>
					<form className={classNames.inputContainer}>
						<Input
							title={'Name'}
							type={'text'}
							onChange={e => {
								setInputs({ ...inputs, name: e.target.value })
							}}
							value={inputs.name}
						/>
						<Input
							title={'Email'}
							type={'email'}
							onChange={e => {
								setInputs({ ...inputs, email: e.target.value })
							}}
							value={inputs.email}
						/>
						<Input
							title={'Twitter/Discord (optional)'}
							type={'email'}
							onChange={e => {
								setInputs({ ...inputs, socialMedia: e.target.value })
							}}
							value={inputs.socialMedia}
						/>
						{isMessageNeeded ? (
							<Input
								title={'Message'}
								inputType={'textarea'}
								type={'text'}
								onChange={e => {
									setInputs({ ...inputs, message: e.target.value })
								}}
								value={inputs.message}
							/>
						) : null}
						{/* <Button size={'md'} onClick={handleSubmit}> */}
						{/*	<h4 className={classNames.buttonTitle}>Send</h4> */}
						{/* </Button> */}
					</form>
				</div>
				<div className={classNames.imageContainer}>
					<img src={object} />
				</div>
				{/* <Button */}
				{/*	className={classNames.closeButton} */}
				{/*	variant={'black'} */}
				{/*	size={'xs'} */}
				{/*	onClick={() => setShow(false)} */}
				{/*	leftIcon={<IconX color={'var(--color-base-white)'} />} */}
				{/* ></Button> */}
			</div>
		</Modal>
	)
}
