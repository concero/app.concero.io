import { Dispatch, useState } from 'react'
import { SwapAction, SwapCardStage, SwapState } from '../../swapReducer/types'
import classNames from './ContactSupport.module.pcss'
import { Button } from '../../../../buttons/Button/Button'
import { IconArrowLeft, IconBrandDiscord, IconCheck, IconCopy, IconMail } from '@tabler/icons-react'
import { copyToClipboard } from '../../../../../utils/copyToClipboard'
import posthog from 'posthog-js'

interface ContactSupportProps {
	swapState: SwapState
	swapDispatch: Dispatch<SwapAction>
}

export function ContactSupport({ swapState, swapDispatch }: ContactSupportProps) {
	const [isCopied, setIsCopied] = useState(false)

	function handleGoBack() {
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
	}

	function handleCopy() {
		const replay_id = posthog.get_distinct_id()
		const session_id = posthog.get_session_id()
		copyToClipboard(JSON.stringify({ ...swapState.selectedRoute, replay_id, session_id })).then(() => {
			setIsCopied(true)
			setIsCopiedTimeout()
		})
	}

	function setIsCopiedTimeout() {
		setTimeout(() => {
			setIsCopied(false)
		}, 10000)
	}

	return (
		<div className={classNames.container}>
			<div>
				<p className={'body1'}>We apologise that you had issues with your transaction. We will do our best to resolve the issue.</p>
			</div>
			<div className={classNames.stepBlock}>
				<h4 className={classNames.title}>1. Copy transaction info</h4>
				<div className={classNames.alightStart}>
					<Button variant={'primary'} leftIcon={isCopied ? <IconCheck size={16} /> : <IconCopy size={16} />} onClick={handleCopy}>
						Copy transaction info
					</Button>
				</div>
			</div>
			<div className={classNames.stepBlock}>
				<h4 className={classNames.title}>2. Drop us a message</h4>
				<div className={classNames.buttonContainer}>
					<Button
						leftIcon={<IconBrandDiscord size={16} />}
						className={classNames.f1}
						onClick={() => window.open('https://discord.com/channels/1155792755105214535/1156171906228170795', '_blank')}
						variant="secondary"
					>
						Discord
					</Button>
					<Button leftIcon={<IconMail size={16} />} className={classNames.f1} variant="secondary" onClick={() => window.open('mailto:Concerocrypto@gmail.com', '_blank')}>
						Email
					</Button>
				</div>
				<Button leftIcon={<IconArrowLeft size={18} color={'var(--color-primary-400)'} />} onClick={() => handleGoBack()} variant="secondary">
					Go back
				</Button>
			</div>
		</div>
	)
}
