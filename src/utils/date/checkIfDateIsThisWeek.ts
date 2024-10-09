import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(isBetween)
dayjs.extend(isoWeek)

export const checkIfDateIsThisWeek = (timestamp: number) => {
	const startOfWeek = dayjs().startOf('week')
	const endOfWeek = dayjs().endOf('week')
	return dayjs(timestamp).isBetween(startOfWeek, endOfWeek, null, '[]')
}
