import { Banners } from '@/entities/Social'
import { PageWrap, ProgressBar } from '@/shared/ui'
import { DailyTaskList, QuestPreviewList } from '@/widgets/Quest'
import cls from './QuestsPage.module.pcss'
import { StreakBlock } from './StreakBlock/StreakBlock'

export const QuestsPage = () => {
	return (
		<PageWrap className={cls.page_wrap}>
			<Banners />
			<StreakBlock />
			<DailyTaskList />
			<QuestPreviewList groups={['rewards']} />
		</PageWrap>
	)
}
