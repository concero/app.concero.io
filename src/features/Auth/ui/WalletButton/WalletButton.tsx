import { useAppKit, useAppKitAccount } from '@reown/appkit/react'
import { useTranslation } from 'react-i18next'
import classNames from './WalletButton.module.pcss'
import { IconWallet } from '@tabler/icons-react'
import { Button } from '@concero/ui-kit'
import { trackEvent } from '@/hooks/useTracking'
import { action, category } from '@/constants/tracking'
import { truncateWallet } from '@/utils/formatting'
import TrailArrowRightIcon from '@/shared/assets/icons/monochrome/TrailArrowRight.svg?react'
import { injected, useAccount, useConnect, useDisconnect } from 'wagmi'

interface Props {
	className?: string
	isFull?: boolean
}

export const WalletButton = ({ className, isFull = false }: Props) => {
	const { address } = useAppKitAccount()
	const { open } = useAppKit()
	const { isConnected } = useAccount()
	const { connect } = useConnect()
	const { disconnect } = useDisconnect()
	const { t } = useTranslation()

	function handleClick() {
		if (isConnected) {
			disconnect()
		} else {
			connect({ connector: injected() })
		}
		void trackEvent({
			category: category.Wallet,
			action: action.ClickConnectWallet,
			label: 'Clicked Connect Wallet',
		})
	}

	const getStatus = () => {
		if (address && isConnected) return truncateWallet(address, 4)
		return t('walletButton.connectWallet')
	}

	return (
		<Button
			isFull={isFull}
			leftIcon={isConnected ? <IconWallet size={16} color="var(--color-gray-600)" /> : null}
			className={`${classNames.buttonWallet} ${className} ${isConnected ? classNames.is_connected : ''}`}
			variant={isConnected ? 'secondary' : 'primary'}
			rightIcon={isConnected && <TrailArrowRightIcon />}
			onClick={handleClick}
		>
			{getStatus()}
		</Button>
	)
}
