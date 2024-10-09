import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(isBetween)
dayjs.extend(isoWeek)

export const checkIfDateIsThisWeek = (timestamp: number) => {
	const startOfWeek = dayjs().startOf('isoWeek')
	const endOfWeek = dayjs().endOf('isoWeek')
	return dayjs(timestamp).isBetween(startOfWeek, endOfWeek, null, '[]')
}
