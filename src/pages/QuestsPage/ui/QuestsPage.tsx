import { Banners } from '@/entities/Social'
import { PageWrap, ProgressBar } from '@/shared/ui'
import { DailyTaskList, QuestPreviewList } from '@/widgets/Quest'
import cls from './QuestsPage.module.pcss'
import { StreakBlock } from './StreakBlock/StreakBlock'

export const QuestsPage = () => {
	return (
		<PageWrap className={cls.page_wrap}>
			<ProgressBar
				variant="solid"
				value={77}
				tag={{
					show: true,
					transform(value) {
						return `${value}%`
					},
				}}
				description={{
					current: 77,
					max: 100,
					title: 'Progress',
				}}
			/>
			<ProgressBar
				variant="segmented"
				value={5}
				maxSegments={10}
				segmentGap={5}
				description={{
					current: 5,
					max: 10,
					title: 'Progress',
				}}
			/>
			<Banners />
			<StreakBlock />
			<DailyTaskList />
			<QuestPreviewList groups={['rewards']} />
		</PageWrap>
	)
}
