import { FC } from 'react'
import { useAccount } from 'wagmi'
import { IconChevronDown, IconWallet } from '@tabler/icons-react'
import { truncateWallet } from '../../../../../utils/formatting'
import { Button } from '../../../../buttons/Button/Button'
import classNames from './BaseButton.module.pcss'
import { useTranslation } from 'react-i18next'

interface BaseButtonProps {
	onClick?: () => void
}

export const BaseButton: FC<BaseButtonProps> = ({ onClick }) => {
	const { address, isConnected, isDisconnected, isConnecting } = useAccount()
	const { t } = useTranslation()

	const getStatus = () => {
		if (isConnected) return truncateWallet(address)
		if (isConnecting) return t('walletButton.connecting')
		if (isDisconnected) return t('walletButton.connectWallet')
		return t('walletButton.connectWallet')
	}

	return (
		<Button
			variant={isConnected ? 'subtle' : 'primary'}
			rightIcon={isConnected ? <IconChevronDown size={18} color={'var(--color-grey-500)'} /> : null}
			leftIcon={<IconWallet size={16} color={isConnected ? 'var(--color-grey-500)' : 'var(--color-base-white)'} />}
			size="sm"
			onClick={() => onClick && onClick()}
		>
			<p className={!isConnected ? classNames.buttonText : 'body1'}>{getStatus()}</p>
		</Button>
	)
}
