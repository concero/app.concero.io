import { JSX } from 'react/jsx-runtime'
import React, { FC, ReactElement, useState } from 'react'
import { useAccount } from 'wagmi'
import { IconLanguage, IconMoon, IconSun } from '@tabler/icons-react'
import { BaseButton } from '../BaseButton/BaseButton'
import { Button } from '../../../../buttons/Button/Button'
import classNames from '../WalletButton.module.pcss'
import { FeedbackModal } from '../../../../modals/FeedbackModal/FeedbackModal'
import { useTranslation } from 'react-i18next'
import { trackEvent } from '../../../../../hooks/useTracking'
import { action, category } from '../../../../../constants/tracking'
import { LanguageModal } from '../../../../modals/LanguageModal/LanguageModal'
import { BurgerMenu } from '../../Header/BurgerMenu/BurgerMenu'
import IntrinsicAttributes = JSX.IntrinsicAttributes

interface DesktopButtonProps {
	onClick: IntrinsicAttributes & ((options?: any) => Promise<void>)
	ButtonWithPopover: (props: any) => ReactElement
	toggleTheme: () => void
	theme: string
}

export const DesktopButton: FC<DesktopButtonProps> = ({ onClick, ButtonWithPopover, toggleTheme, theme }) => {
	const { t } = useTranslation()
	const [isFeedbackModalOpened, setIsFeedbackModalOpened] = useState(false)
	const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false)
	const { isConnected } = useAccount()

	const handleHelpButtonClick = () => {
		setIsFeedbackModalOpened(prev => !prev)
		trackEvent({ category: category.Header, action: action.ToggleFeedbackModalVisible, label: 'toggle_feedback_modal' })
	}

	return (
		<div className={classNames.container}>
			<Button variant="subtle" size="sm" className={classNames.helpButton} onClick={() => handleHelpButtonClick()}>
				{t('modal.helpUsImprove')}
			</Button>
			{isConnected ? <ButtonWithPopover onClick={onClick} /> : <BaseButton onClick={onClick} />}
			<Button size="sq-md" onClick={toggleTheme} variant="black" leftIcon={theme === 'light' ? <IconMoon size={18} /> : <IconSun size={18} />} />
			<FeedbackModal show={isFeedbackModalOpened} setShow={setIsFeedbackModalOpened} />
			<Button leftIcon={<IconLanguage size={18} />} variant={'black'} onClick={() => setIsLanguageModalVisible(prev => !prev)} />
			<BurgerMenu />
			<LanguageModal show={isLanguageModalVisible} setShow={setIsLanguageModalVisible} />
		</div>
	)
}
