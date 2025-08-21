import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(isoWeek)

/** Returns object with seconds */
export const getWeekRangeDates = (): { startDate: number; endDate: number } => {
	/** Timestamp seconds */
	const startDate = dayjs().startOf('isoWeek').unix()

	/** Timestamp seconds */
	const endDate = dayjs().endOf('isoWeek').unix()

	return { startDate, endDate }
}

/** Returns object with seconds */
export const getDayRangeDates = (): { startDate: number; endDate: number } => {
	/** Timestamp seconds */
	const startDate = dayjs().startOf('day').unix()

	/** Timestamp seconds */
	const endDate = dayjs().endOf('day').unix()

	return { startDate, endDate }
}
