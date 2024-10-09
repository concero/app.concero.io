import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export const hasQuestEventStarted = (startDate: number): boolean => {
	const now = dayjs()
	const start = dayjs(startDate)

	return now.isAfter(start)
}

export const getQuestDaysLeft = (endDate: number) => {
	const now = dayjs()
	const end = dayjs(endDate)

	if (now.isAfter(end)) {
		return 0
	}

	const daysLeft = end.diff(now, 'day')

	return daysLeft > 0 ? daysLeft : 0
}
