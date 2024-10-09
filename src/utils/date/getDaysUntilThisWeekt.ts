import dayjs from 'dayjs'

export const getDaysUntilEndOfWeek = (): number => {
	const today = dayjs()
	const endOfWeek = dayjs().endOf('week')

	return endOfWeek.diff(today, 'day')
}
