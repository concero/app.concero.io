import { JSX } from 'react/jsx-runtime'
import { FC, ReactElement, useState } from 'react'
import { useAccount } from 'wagmi'
import { IconMoon, IconSun } from '@tabler/icons-react'
import { BaseButton } from '../BaseButton/BaseButton'
import { Button } from '../../../../buttons/Button/Button'
import classNames from '../WalletButton.module.pcss'
import { FeedbackModal } from '../../../../modals/FeedbackModal/FeedbackModal'
import { useTranslation } from 'react-i18next'
import IntrinsicAttributes = JSX.IntrinsicAttributes

interface DesktopButtonProps {
	open: IntrinsicAttributes & ((options?: any) => Promise<void>)
	ButtonWithPopover: (props: any) => ReactElement
	toggleTheme: () => void
	theme: string
}

export const DesktopButton: FC<DesktopButtonProps> = ({ open, ButtonWithPopover, toggleTheme, theme }) => {
	const [isFeedbackModalOpened, setIsFeedbackModalOpened] = useState(false)
	const { isConnected } = useAccount()
	const { t } = useTranslation()

	const handleHelpButtonClick = () => {
		setIsFeedbackModalOpened(prev => !prev)
	}

	return (
		<div className={classNames.container}>
			<Button variant="subtle" size="sm" className={classNames.helpButton} onClick={() => handleHelpButtonClick()}>
				{t('modal.helpUsImprove')}
			</Button>
			{isConnected ? <ButtonWithPopover onClick={open} /> : <BaseButton onClick={open} />}
			<Button size="sq-md" onClick={toggleTheme} variant="black" leftIcon={theme === 'light' ? <IconMoon size={18} /> : <IconSun size={18} />} />
			<FeedbackModal show={isFeedbackModalOpened} setShow={setIsFeedbackModalOpened} />
		</div>
	)
}
