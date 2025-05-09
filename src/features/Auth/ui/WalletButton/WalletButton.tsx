import { useTranslation } from 'react-i18next'
import classNames from './WalletButton.module.pcss'
import { IconWallet } from '@tabler/icons-react'
import { Button } from '@concero/ui-kit'
import { trackEvent } from '@/hooks/useTracking'
import { action, category } from '@/constants/tracking'
import { truncateWallet } from '@/utils/formatting'
import TrailArrowRightIcon from '@/shared/assets/icons/monochrome/TrailArrowRight.svg?react'
import { injected, useAccount, useConnect, useDisconnect } from 'wagmi'
import { walletConnect } from 'wagmi/connectors'
import { useEffect } from 'react'
import { projectId } from '@/shared/api/wagmi'
interface Props {
	className?: string
	isFull?: boolean
	setLoading?: (isLoading: boolean) => void
}

export const WalletButton = ({ className, isFull = false, setLoading }: Props) => {
	const { isConnected, address } = useAccount()
	const { connect, error, isPending } = useConnect()
	const { disconnect } = useDisconnect()
	const { t } = useTranslation()

	function handleClick() {
		if (isConnected) {
			disconnect()
		} else {
			if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
				connect({ connector: injected() })
			} else {
				connect({ connector: walletConnect({ projectId: projectId }) })
			}
		}
		void trackEvent({
			category: category.Wallet,
			action: action.ClickConnectWallet,
			label: 'Clicked Connect Wallet',
		})
	}
	useEffect(() => {
		setLoading?.(isPending)
	}, [isPending])
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
