import { useState } from 'react'
import classNames from './ContactSupportCard.module.pcss'
import { Button } from '../../buttons/Button/Button'
import { IconArrowLeft, IconBrandDiscord, IconCheck, IconCopy, IconMail } from '@tabler/icons-react'
import { copyToClipboard } from '../../../utils/copyToClipboard'
import { useTranslation } from 'react-i18next'

interface ContactSupportProps {
	infoToCopy: any
	handleGoBackClick?: () => void
}

export function ContactSupportCard({ infoToCopy, handleGoBackClick }: ContactSupportProps) {
	const [isCopied, setIsCopied] = useState(false)
	const { t } = useTranslation()

	function handleCopy() {
		copyToClipboard(JSON.stringify(infoToCopy)).then(() => {
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
				<p className={'body1'}>{t('contactSupportCard.txFailedMessage')}</p>
			</div>
			<div className={classNames.stepBlock}>
				<h4 className={classNames.title}>1. {t('contactSupportCard.copyDebugInfo')}</h4>
				<div className={classNames.alightStart}>
					<Button variant={'primary'} leftIcon={isCopied ? <IconCheck size={16} /> : <IconCopy size={16} />} onClick={handleCopy}>
						{t('contactSupportCard.copyDebugInfo')}
					</Button>
				</div>
			</div>
			<div className={classNames.stepBlock}>
				<h4 className={classNames.title}>2. {t('contactSupportCard.dropUsAMessage')}</h4>
				<div className={classNames.buttonContainer}>
					<Button
						leftIcon={<IconBrandDiscord size={16} />}
						className={classNames.f1}
						onClick={() => window.open('https://discord.com/channels/1155792755105214535/1156171906228170795', '_blank')}
						variant="secondary"
					>
						{t('socialMedia.discord')}
					</Button>
					<Button
						leftIcon={<IconMail size={16} />}
						className={classNames.f1}
						variant="secondary"
						onClick={() => window.open('mailto:Concerocrypto@gmail.com', '_blank')}
					>
						{t('socialMedia.email')}
					</Button>
				</div>
				{handleGoBackClick ? (
					<Button
						leftIcon={<IconArrowLeft size={18} color={'var(--color-primary-400)'} />}
						onClick={() => {
							handleGoBackClick()
						}}
						variant="secondary"
					>
						{t('button.goBack')}
					</Button>
				) : null}
			</div>
		</div>
	)
}
