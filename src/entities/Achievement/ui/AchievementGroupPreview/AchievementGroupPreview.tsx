import { Button, Tag } from '@concero/ui-kit'
import noob from '@/shared/assets/images/achievements/achivment_noob.png'
import sigma from '@/shared/assets/images/achievements/achivment_sigma.png'
import chad from '@/shared/assets/images/achievements/achivment_chad.png'
import gigachad from '@/shared/assets/images/achievements/achivment_gigachad.png'
import lancardio from '@/shared/assets/images/achievements/achivment_lancardio.png'
import cls from './AchievementGroupPreview.module.pcss'
export const AchievementGroupPreview = () => {
	return (
		<div className={cls.group_wrap}>
			<Tag size="s" variant="neutral">
				Coming soon
			</Tag>
			<div className={cls.images_wrap}>
				<img src={noob} alt="achievement low" width={56} height={56} style={{ opacity: '50%' }} />
				<img src={sigma} alt="achievement low" width={56} height={56} style={{ opacity: '50%' }} />
				<img src={chad} alt="achievement low" width={56} height={56} style={{ opacity: '50%' }} />
				<img src={gigachad} alt="achievement low" width={56} height={56} style={{ opacity: '50%' }} />
				<img src={lancardio} alt="achievement low" width={56} height={56} style={{ opacity: '50%' }} />
			</div>
			<div>
				<Button variant="tetrary_color" size="s" isDisabled>
					Open achievements
				</Button>
			</div>
		</div>
	)
}
