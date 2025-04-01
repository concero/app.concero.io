import { Button } from '@concero/ui-kit'
import LancaIcon from '@/shared/assets/icons/Lanca_logomark.svg?react'
import ConceroIcon from '@/shared/assets/icons/Concero_icon_banner.svg?react'
import { Banner } from '@/shared/ui'
import cls from './Banners.module.pcss'
import { useAccount } from 'wagmi'
import { isAdminAddress } from '@/shared/lib/tests/isAdminAddress'

export const Banners = () => {
	const { isConnected, address } = useAccount()
	const isAdmin = isAdminAddress(address)
	if (!isAdmin) return null
	const handleLancaClick = () => {
		window.open('https://app.lanca.io', '_blank')
	}
	const handleTestnetClick = () => {
		window.open('https://testnet.concero.io', '_blank')
	}
	return (
		<div className={cls.banners_wrap}>
			<Banner className={cls.lanca_banner_wrap}>
				<div className={cls.heading_wrap}>
					<LancaIcon />
					<span className={cls.title}>Lanca</span>
					<span className={cls.description}>Swap, and earn CERs </span>
				</div>
				<Button variant="primary" size="m" className={cls.btn} onClick={handleLancaClick}>
					Swap
				</Button>
			</Banner>
			{/* <Banner className={cls.testnet_banner_wrap}>
				<div className={cls.heading_wrap}>
					<ConceroIcon />
					<span className={cls.title}>Concero Testnet is live!</span>
				</div>
				<Button variant="primary" size="m" onClick={handleTestnetClick}>
					Open Testnet
				</Button>
			</Banner> */}
		</div>
	)
}
