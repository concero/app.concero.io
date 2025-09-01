import { useTheme } from '@concero/ui-kit'
import TestingPortalLightImage from '@/shared/assets/icons/light_testing_portal_rocket.png'
import TestingPortalDarkImage from '@/shared/assets/icons/dark_testing_portal_rocket.png'

import cls from './TestingPage.module.pcss'
import { QuestPreviewList } from '@/widgets/Quest'
import { PageWrap } from '@/shared/ui'
export const TestingPage = () => {
	const { theme } = useTheme()
	return (
		<PageWrap>
			<div className={cls.testing_start_block}>
				<img
					src={theme === 'light' ? TestingPortalLightImage : TestingPortalDarkImage}
					alt="Rocket of testing portal"
				/>
				<div className={cls.description_block}>
					<div className={cls.title}>Welcome to the Testing Portal!</div>
					<div className={cls.subtitle}>
						Participate in surveys about products built on our protocol and earn rewards. Your feedback
						improves these products and supports their growth.
					</div>
				</div>
			</div>
			<QuestPreviewList groups={['testing']} />
		</PageWrap>
	)
}
