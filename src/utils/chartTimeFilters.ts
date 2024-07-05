import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import weekday from 'dayjs/plugin/weekday'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isToday)
dayjs.extend(isSameOrAfter)
dayjs.extend(weekday)
dayjs.extend(isSameOrBefore)

const getStartOfToday = () => {
	return dayjs().startOf('day').subtract(1, 'day').valueOf() / 1000
}

const getStartOfThisWeek = () => {
	return dayjs().weekday(0).startOf('day').subtract(1, 'day').valueOf() / 1000
}

const getStartOfThisMonth = () => {
	return dayjs().startOf('month').subtract(1, 'day').valueOf() / 1000
}

export interface SelectItem {
	title: string
	value: string
	startTime: number | null
	endTime: number | null
}

export const createTimeFilters = () => {
	const now = dayjs().valueOf() / 1000

	return [
		{
			title: 'Today',
			value: 'today',
			startTime: getStartOfToday(),
			endTime: now,
		},
		{
			title: 'This week',
			value: 'this week',
			startTime: getStartOfThisWeek(),
			endTime: now,
		},
		{
			title: 'This month',
			value: 'this month',
			startTime: getStartOfThisMonth(),
			endTime: now,
		},
		{
			title: 'All-time',
			value: 'all-time',
			startTime: null,
			endTime: null,
		},
	]
}
