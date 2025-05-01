import { Button, Tag, useTheme } from '@concero/ui-kit'
import noob from '@/shared/assets/images/achievements/achivment_noob.webp'
import noobDark from '@/shared/assets/images/achievements/dark_achivment_noob.webp'
import sigma from '@/shared/assets/images/achievements/achivment_sigma.webp'
import sigmaDark from '@/shared/assets/images/achievements/dark_achivment_sigma.webp'
import chad from '@/shared/assets/images/achievements/achivment_chad.webp'
import chadDark from '@/shared/assets/images/achievements/dark_achivment_chad.webp'
import gigachad from '@/shared/assets/images/achievements/achivment_gigachad.webp'
import gigachadDark from '@/shared/assets/images/achievements/dark_achivment_gigachad.webp'
import lancardio from '@/shared/assets/images/achievements/achivment_lancardio.webp'
import lancardioDark from '@/shared/assets/images/achievements/dark_achivment_lancardio.webp'
import cls from './AchievementGroupPreview.module.pcss'
export const AchievementGroupPreview = () => {
	const { theme } = useTheme()
	return (
		<div className={cls.group_wrap}>
			<Tag size="s" variant="neutral">
				Coming soon
			</Tag>
			<div className={cls.images_wrap}>
				<img
					src={theme == 'light' ? noob : noobDark}
					alt="achievement 1"
					width={56}
					height={56}
					style={{ opacity: '50%' }}
				/>
				<img
					src={theme == 'light' ? sigma : sigmaDark}
					alt="achievement 2"
					width={56}
					height={56}
					style={{ opacity: '50%' }}
				/>
				<img
					src={theme == 'light' ? chad : chadDark}
					alt="achievement 3"
					width={56}
					height={56}
					style={{ opacity: '50%' }}
				/>
				<img
					src={theme == 'light' ? gigachad : gigachadDark}
					alt="achievement 4"
					width={56}
					height={56}
					style={{ opacity: '50%' }}
				/>
				<img
					src={theme == 'light' ? lancardio : lancardioDark}
					alt="achievement 5"
					width={56}
					height={56}
					style={{ opacity: '50%' }}
				/>
			</div>
			<div>
				<Button variant="tetrary_color" size="s" isDisabled>
					Open achievements
				</Button>
			</div>
		</div>
	)
}
