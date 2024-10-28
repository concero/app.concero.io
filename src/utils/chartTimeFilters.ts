import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import weekday from 'dayjs/plugin/weekday'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isToday)
dayjs.extend(isSameOrAfter)
dayjs.extend(weekday)
dayjs.extend(isSameOrBefore)

const getStartOfThisMonth = () => {
	return dayjs().subtract(29, 'day').valueOf() / 1000
}

const getStartOfThreeMonthAgo = () => {
	return dayjs().subtract(3, 'month').valueOf() / 1000
}

type TimeOption = 'M' | '3M' | 'All'

export interface SelectItem {
	title: string
	value: TimeOption
	startTime: number | null
	endTime: number | null
}

export const createTimeFilters = () => {
	const now = dayjs().valueOf() / 1000

	return [
		{
			title: 'M',
			value: '3M',
			startTime: getStartOfThisMonth(),
			endTime: now,
		},
		{
			title: '3M',
			value: '3M',
			startTime: getStartOfThreeMonthAgo(),
			endTime: now,
		},
		{
			title: 'All time',
			value: 'all-time',
			startTime: null,
			endTime: null,
		},
	]
}
