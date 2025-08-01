import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

/**
 * @param endDate — timestamp seconds
 */
export const getQuestDaysLeft = (endDate: number): number => {
	const now = dayjs()
	const end = dayjs(endDate * 1000)

	if (now.isAfter(end)) {
		return 0
	}

	const daysLeft = end.diff(now, 'day')
	return daysLeft > 0 ? daysLeft : 0
}
