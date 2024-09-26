import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export const hasQuestEventStarted = (startDate: number) => {
	const now = dayjs()
	const start = dayjs(startDate)
	console.log(start.format())

	return now.isAfter(start)
}

export const getQuestDaysLeft = (endDate: number) => {
	const now = dayjs()
	const end = dayjs(endDate)

	const daysLeft = now.diff(end, 'day')

	return daysLeft > 0 ? daysLeft : 0
}
