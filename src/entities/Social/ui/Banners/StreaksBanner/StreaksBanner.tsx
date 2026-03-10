import { Banner, Text } from '@/shared/ui'
import CersIcon from '@/shared/assets/icons/CersEidi.svg?react'
import cls from './StreaksBanner.module.pcss'

export const StreaksBanner = () => {
	return (
		<Banner className={cls.cerp_banner_wrap}>
			<div className={cls.heading_wrap_with_icon}>
				<div className={cls.wrap_icon}>
					<CersIcon />
				</div>
				<div className={cls.heading_wrap}>
					<span className={cls.title}>CERs season 2 is here!</span>
					<Text variant="body_large" className={cls.description}>
						Streaks will not accumulate temporarily, but they will not be reset either — multipliers will
						remain unchanged.
					</Text>
				</div>
			</div>
		</Banner>
	)
}
