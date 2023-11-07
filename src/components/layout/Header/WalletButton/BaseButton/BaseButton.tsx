import { FC, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { IconChevronDown, IconWallet } from '@tabler/icons-react'
import { truncateWallet } from '../../../../../utils/formatting'
import { Button } from '../../../../buttons/Button/Button'
import classNames from './BaseButton.module.pcss'
import { useTracking } from '../../../../../hooks/useTracking'

interface BaseButtonProps {
	onClick?: () => void
}

export const BaseButton: FC<BaseButtonProps> = ({ onClick }) => {
	const { address, isConnected, isDisconnected, isConnecting } = useAccount()
	const { trackEvent } = useTracking()
	const getStatus = () => {
		if (isConnected) return truncateWallet(address)
		if (isConnecting) return 'Connecting...'
		if (isDisconnected) return 'Connect Wallet'
		return 'Connect Wallet'
	}

	useEffect(() => {
		if (address) {
			trackEvent({
				category: 'Wallet',
				action: 'Connect',
				label: 'Wallet Connected',
				data: {
					address: address,
				},
			})
		}
	}, [address])

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
