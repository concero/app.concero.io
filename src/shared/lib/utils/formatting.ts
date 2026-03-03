import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import dayjs from 'dayjs'

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
	relativeTime: {
		future: 'in %s',
		past: '%s',
		s: 'now',
		m: 'a min',
		mm: '%dm',
		h: '1h',
		hh: '%dh',
		d: 'a day',
		dd: '%dd',
		M: '1 mon',
		MM: '%dm',
		y: 'a year',
		yy: '%dy',
	},
})
export default dayjs

// Date and time formatting
// const formatDate = (date: string | Date, format = 'YYYY-MM-DD'): string => dayjs(date).format(format)

export const formatDateTime = (date: string | Date, format = 'YYYY-MM-DD HH:mm'): string => dayjs(date).format(format)

// String formatting
export const toTitleCase = (str: string): string =>
	str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())

export const toCamelCase = (str: string): string =>
	str.replace(/([-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', ''))

export const toSnakeCase = (str: string): string =>
	str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`).replace(/^-/, '')

// URL formatting
export const slugify = (str: string): string =>
	str
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[^\w-]+/g, '')

// trucate wallet address to 6 characters on the end
export const truncateWallet = (str: string, firstSlice: number = 6): string =>
	`${str.slice(0, firstSlice)}...${str.slice(-4)}`

export const roundToPrecision = (num: number, precision: number) => {
	const factor = Math.pow(10, precision)
	return Math.round(num * factor) / factor
}

export const toLocaleNumber = (num: number | string, fixed = 0) => {
	if (!num) return 0

	const number = Number(num)
	const formattedNumber = number % 1 === 0 ? number.toString() : roundToPrecision(number, fixed).toString()

	return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
