import { Banner } from '@/shared/ui'
import InfoIcon from '@/shared/assets/icons/InfoWrapped.svg?react'
import cls from './StreaksBanner.module.pcss'

export const StreaksBanner = () => {
	return (
		<Banner className={cls.cerp_banner_wrap}>
			<div className={cls.heading_wrap_with_icon}>
				<div className={cls.wrap_icon}>
					<InfoIcon />
				</div>
				<div className={cls.heading_wrap}>
					<span className={cls.title}>
						Streaks will no longer accumulate but won’t reset — multipliers remain intact.
					</span>
				</div>
			</div>
		</Banner>
	)
}
