import { Button } from '@concero/ui-kit'
import LancaIcon from '@/shared/assets/icons/Lanca_logomark.svg?react'
import ConceroIcon from '@/shared/assets/icons/Concero_icon_banner.svg?react'
import CersEidiIcon from '@/shared/assets/icons/CersEidi.svg?react'
import { Banner } from '@/shared/ui'
import cls from './Banners.module.pcss'
import { useAccount } from 'wagmi'
import { isAdminAddress } from '@/shared/lib/tests/isAdminAddress'
import { useCheckCersEidi, useClaimCersEidiMutation } from '../../api/SocialApi'

export const Banners = () => {
	const { address } = useAccount()
	const isAdmin = isAdminAddress(address)
	const { data: isShowCersEidi } = useCheckCersEidi({ address })
	const { mutate } = useClaimCersEidiMutation()
	console.log('isShowCersEidi:', isShowCersEidi)

	if (!isAdmin) return null
	const handleLancaClick = () => {
		window.open('https://app.lanca.io', '_blank')
	}
	const handleTestnetClick = () => {
		window.open('https://testnet.concero.io', '_blank')
	}
	const handleClaimCersEidi = () => {
		if (address) {
			mutate({ address })
		}
	}
	return (
		<div className={cls.banners_wrap}>
			<Banner className={cls.lanca_banner_wrap}>
				<div className={cls.heading_wrap_with_icon}>
					<LancaIcon />
					<div className={cls.heading_wrap}>
						<span className={cls.title}>Lanca</span>
						<span className={cls.description}>Swap, and earn CERs </span>
					</div>
				</div>
				<Button variant="primary" size="m" className={cls.btn} onClick={handleLancaClick}>
					Swap
				</Button>
			</Banner>
			<Banner className={cls.testnet_banner_wrap}>
				<div className={cls.heading_wrap_with_icon}>
					<ConceroIcon />
					<div className={cls.heading_wrap}>
						<span className={cls.title}>Concero Testnet is live!</span>
					</div>
				</div>
				<Button variant="primary" size="m" className={cls.btn} onClick={handleTestnetClick}>
					Open Testnet
				</Button>
			</Banner>
			{isShowCersEidi && (
				<Banner className={cls.testnet_banner_wrap}>
					<div className={cls.heading_wrap_with_icon}>
						<CersEidiIcon />
						<div className={cls.heading_wrap}>
							<span className={cls.title}>CERs Eidi</span>
							<span className={cls.description}>Given by your beloved Lancan Intern </span>
						</div>
					</div>
					<Button variant="primary" size="m" className={cls.btn} onClick={handleClaimCersEidi}>
						Claim
					</Button>
				</Banner>
			)}
		</div>
	)
}
