import { JSX } from 'react/jsx-runtime'
import React, { FC, ReactElement, useState } from 'react'
import { useAccount } from 'wagmi'
import { IconCheck, IconLanguage, IconMoon, IconSun } from '@tabler/icons-react'
import { BaseButton } from '../BaseButton/BaseButton'
import { Button } from '../../../../buttons/Button/Button'
import classNames from '../WalletButton.module.pcss'
import { FeedbackModal } from '../../../../modals/FeedbackModal/FeedbackModal'
import { useTranslation } from 'react-i18next'
import { trackEvent } from '../../../../../hooks/useTracking'
import { action, category } from '../../../../../constants/tracking'
import { ListModal } from '../../../../modals/ListModal/ListModal'
import { Language, languages } from '../../../../../i18n/languages'
import IntrinsicAttributes = JSX.IntrinsicAttributes

interface DesktopButtonProps {
	onClick: IntrinsicAttributes & ((options?: any) => Promise<void>)
	ButtonWithPopover: (props: any) => ReactElement
	toggleTheme: () => void
	theme: string
}

export const DesktopButton: FC<DesktopButtonProps> = ({ onClick, ButtonWithPopover, toggleTheme, theme }) => {
	const { t, i18n } = useTranslation()
	const currentLanguage = i18n.language
	const [isFeedbackModalOpened, setIsFeedbackModalOpened] = useState(false)
	const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false)
	const [selectedItems, setSelectedItems] = useState([languages.find((language: Language) => language.id === currentLanguage)])
	const { isConnected } = useAccount()

	const handleHelpButtonClick = () => {
		setIsFeedbackModalOpened(prev => !prev)
		trackEvent({ category: category.Header, action: action.ToggleFeedbackModalVisible, label: 'toggle_feedback_modal' })
	}

	async function handleSelectLanguage(item: any) {
		await i18n.changeLanguage(item.id)
		const newLanguage = languages.find((language: Language) => language.id === item.id)
		setSelectedItems([newLanguage])
		setIsLanguageModalVisible(false)
	}

	async function getItems(): Promise<any> {
		return new Promise(resolve => resolve(languages))
	}

	const renderItem = ({ item, isSelected, onSelect }) => {
		return (
			<Button onClick={() => onSelect(item)} variant={isSelected ? 'filled' : 'black'}>
				<div className={classNames.renderItemContainer}>
					{item.title}
					<div>{isSelected ? <IconCheck size={18} /> : null}</div>
				</div>
			</Button>
		)
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
			{/* <LanguageModal show={isLanguageModalVisible} setShow={setIsLanguageModalVisible} /> */}
			<ListModal
				isSearchable={false}
				isOpen={isLanguageModalVisible}
				setIsOpen={setIsLanguageModalVisible}
				title={t('languageModal.title')}
				selectedItems={selectedItems}
				onSelect={handleSelectLanguage}
				getItems={getItems}
				RenderItem={renderItem}
			/>
		</div>
	)
}
