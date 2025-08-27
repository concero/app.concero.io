import { useState } from 'react'
import cls from './ContactSupportCard.module.pcss'
import { IconArrowLeft, IconCheck } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import CopyIcon from '@/shared/assets/icons/monochrome/Copy.svg?react'
import { Button } from '@concero/ui-kit'
import { copyToClipboard } from '@/shared/lib/utils/copyToClipboard'
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
		<div className={cls.container}>
			<div>
				<p className={'body1'}>{t('contactSupportCard.txFailedMessage')}</p>
			</div>
			<div className={cls.step_block}>
				<h4 className={cls.title}>1. {t('contactSupportCard.copyDebugInfo')}</h4>
				<div className={cls.alight_start}>
					<Button
						variant={'secondary'}
						size="m"
						leftIcon={isCopied ? <IconCheck size={16} /> : <CopyIcon />}
						onClick={handleCopy}
					>
						{t('contactSupportCard.copyDebugInfo')}
					</Button>
				</div>
			</div>
			<div className={cls.step_block}>
				<h4 className={cls.title}>2. {t('contactSupportCard.dropUsAMessage')}</h4>
				<div className={cls.button_container}>
					<Button
						size="m"
						className={cls.f1}
						onClick={() =>
							window.open(
								'https://discord.com/channels/1155792755105214535/1156171906228170795',
								'_blank',
							)
						}
						variant="secondary"
					>
						{t('socialMedia.discord')}
					</Button>
					<Button
						size="m"
						className={cls.f1}
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
