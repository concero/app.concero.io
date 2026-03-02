import { Button } from '@concero/ui-kit'
import LancaIcon from '@/shared/assets/icons/Lanca_logomark.svg?react'

import { Banner } from '@/shared/ui'
import cls from './Banners.module.pcss'
export const Banners = () => {
	const handleLancaClick = () => {
		window.open('https://app.lanca.io', '_blank')
	}
	return (
		<div className={cls.banners_wrap}>
			<Banner className={cls.lanca_banner_wrap}>
				<div className={cls.heading_wrap_with_icon}>
					<div className={cls.wrap_icon}>
						<LancaIcon />
					</div>
					<div className={cls.heading_wrap}>
						<span className={cls.title}>Lanca is entering a new chapter.</span>
						<span className={cls.description}>
							We’re sunsetting current pools and pausing swaps, bridges, and quests. If you provided
							liquidity, please withdraw it — pool support ends soon.
						</span>
					</div>
				</div>
				<Button variant="primary" size="m" className={cls.btn} onClick={handleLancaClick}>
					Open pools
				</Button>
			</Banner>
		</div>
	)
}
