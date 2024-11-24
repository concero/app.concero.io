import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(isoWeek)

export const getDaysUntil = (mode: 'day' | 'week' | 'month' = 'day'): number => {
	const today = dayjs()
	const endOfDate = dayjs().endOf(mode === 'week' ? 'isoWeek' : mode)

	return endOfDate.diff(today, mode === 'day' ? 'hour' : 'day')
}
