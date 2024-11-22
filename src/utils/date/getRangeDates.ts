import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(isoWeek)

export const getWeekRangeDates = (): { startDate: number; endDate: number } => {
	const startDate = dayjs().startOf('isoWeek').valueOf()
	const endDate = dayjs().endOf('isoWeek').valueOf()

	return { startDate, endDate }
}

export const getDayRangeDates = (): { startDate: number; endDate: number } => {
	const startDate = dayjs().startOf('day').valueOf()
	const endDate = dayjs().endOf('day').valueOf()

	return { startDate, endDate }
}
