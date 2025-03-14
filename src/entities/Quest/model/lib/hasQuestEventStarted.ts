import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export const hasQuestEventStarted = (startDate: number): boolean => {
	const now = dayjs()
	const start = dayjs(startDate)

	return now.isAfter(start)
}
