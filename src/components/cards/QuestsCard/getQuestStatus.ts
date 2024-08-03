import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export const getQuestStatus = (dateStart: Date, dateEnd: Date) => {
	const now = dayjs()
	const start = dayjs(dateStart)
	const end = dayjs(dateEnd)
	let status = ''
	let isLaunched = false
	const duration = end.diff(start, 'hour')

	if (now.isBefore(start)) {
		status = 'Upcoming'
	} else if (now.isSame(start, 'day') && duration > 72) {
		status = 'Just launched'
		isLaunched = true
	} else if (now.isAfter(start) && now.isBefore(end)) {
		const daysLeft = end.diff(now, 'day')
		const hoursLeft = end.diff(now, 'hour')
		const minutesLeft = end.diff(now, 'minute') % 60

		if (duration <= 72) {
			status = `Ends in ${hoursLeft}h ${minutesLeft}min`
		} else {
			if (daysLeft > 0) {
				status = daysLeft === 1 ? 'Ends tomorrow' : `Ends in ${daysLeft} days`
			} else if (hoursLeft > 0) {
				status = `Ends in ${hoursLeft}h ${minutesLeft}min`
			} else {
				status = `Ends in ${minutesLeft}min`
			}
		}
	} else {
		const daysAgo = now.diff(end, 'day')
		const hoursAgo = now.diff(end, 'hour') % 24
		const minutesAgo = now.diff(end, 'minute') % 60

		if (daysAgo > 0) {
			status = daysAgo === 1 ? 'Ended 1 day ago' : `Ended ${daysAgo} days ago`
		} else if (hoursAgo > 0) {
			status = `Ended ${hoursAgo}h ${minutesAgo}min ago`
		} else {
			status = `Ended ${minutesAgo}min ago`
		}
	}

	return { status, isLaunched }
}
