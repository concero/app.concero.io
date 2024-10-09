import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(isoWeek)

export const getDaysUntilEndOfWeek = (): number => {
	const today = dayjs()
	const endOfWeek = dayjs().endOf('isoWeek')

	return endOfWeek.diff(today, 'day')
}
