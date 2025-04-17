import { useTranslation } from 'react-i18next'
import { ListModal } from '../ListModal/ListModal'
import { useState } from 'react'
import { Button } from '../../buttons/Button/Button'
import classNames from '../../layout/Header/WalletButton/WalletButton.module.pcss'
import { setItem } from '../../../utils/localStorage'
import { Language, languages } from '@/shared/i18n/languages'

interface LanguageModalProps {
	setShow: (value: boolean) => void
	show: boolean
}

export function LanguageModal({ setShow, show }: LanguageModalProps) {
	const { t, i18n } = useTranslation()
	const currentLanguage = i18n.language
	const [selectedItems, setSelectedItems] = useState([
		languages.find((language: Language) => language.id === currentLanguage),
	])

	const renderItem = ({
		item,
		isSelected,
		onSelect,
	}: {
		item: any
		isSelected: boolean
		onSelect: (i: any) => void
	}) => {
		return (
			<Button
				onClick={() => {
					onSelect(item)
				}}
				variant={isSelected ? 'secondaryColor' : 'secondary'}
				className={classNames.renderItemContainer}
			>
				{item.title}
			</Button>
		)
	}

	async function getItems(): Promise<any> {
		return await new Promise(resolve => {
			resolve(languages)
		})
	}

	async function handleSelectLanguage(item: any): Promise<void> {
		await i18n.changeLanguage(item.id)
		const newLanguage = languages.find((language: Language) => language.id === item.id)
		setSelectedItems([newLanguage])
		setShow(false)
		setItem('language', item.id)
	}

	return (
		<ListModal
			isHandleEndReached={false}
			isSearchable={false}
			isOpen={show}
			setIsOpen={setShow}
			title={t('languageModal.title')}
			selectedItems={selectedItems}
			onSelect={handleSelectLanguage}
			getItems={getItems}
			RenderItem={renderItem}
		/>
	)
}
