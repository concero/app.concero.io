import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { walletConnect } from 'wagmi/connectors'
import { injected, useAccount, useConnect, useDisconnect } from 'wagmi'
import { IconWallet } from '@tabler/icons-react'
import { Button } from '@concero/ui-kit'
import { truncateWallet } from '@/utils/formatting'
import TrailArrowRightIcon from '@/shared/assets/icons/monochrome/TrailArrowRight.svg?react'
import { projectId } from '@/shared/api/wagmi'
import classNames from './WalletButton.module.pcss'
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
			className={`${classNames.button_wallet} ${className} ${isConnected ? classNames.is_connected : ''}`}
			variant={isConnected ? 'secondary' : 'primary'}
			rightIcon={isConnected && <TrailArrowRightIcon />}
			onClick={handleClick}
		>
			{getStatus()}
		</Button>
	)
}
