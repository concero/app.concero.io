import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import dayjs from 'dayjs'
import BigNumber from 'bignumber.js'

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

export function isValidNumber(number: string | number) {
	if (typeof number === 'string') {
		return number !== ''
	} else {
		return !(number === undefined || number === null || isNaN(number))
	}
}

// Date and time formatting
// const formatDate = (date: string | Date, format = 'YYYY-MM-DD'): string => dayjs(date).format(format)

export const formatDateTime = (date: string | Date, format = 'YYYY-MM-DD HH:mm'): string => dayjs(date).format(format)

export const formatTime = (date: string | Date, format = 'HH:mm'): string => dayjs(date).format(format)

export const fromNow = (date: string | Date): string => dayjs(date).fromNow()

export const unixtimeFromNow = (unixtime: number): string => dayjs.unix(unixtime).fromNow()

export const unixTimeFormat = (unixtime: number, format = 'YYYY-MM-DD HH:mm'): string =>
	dayjs.unix(unixtime).format(format)

// Number and currency formatting
// export const formatNumber = (num: number, decimalPlaces = 2): string => num.toFixed(decimalPlaces)

export const formatCurrency = (amount: number, currency = 'USD'): string =>
	new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
	}).format(amount)

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

export const getHostname = (url: string): string => new URL(url).hostname

// turns 'https://cointelegraph.com/abcd' into cointelegraph
export const getDomain = (url: string): string => getHostname(url).replace('www.', '').split('.')[0]
// String manipulation

export const truncate = (str: string, length = 100, ending = '...'): string =>
	str.length > length ? str.substring(0, length - ending.length) + ending : str

// trucate wallet address to 6 characters on the end
export const truncateWallet = (str: string, firstSlice: number = 6): string =>
	`${str.slice(0, firstSlice)}...${str.slice(-4)}`

export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1)

export const removeWhitespace = (str: string): string => str.replace(/\s/g, '')

export const removeNonNumeric = (str: string): string => str.replace(/\D/g, '')

export const removeNonAlphaNumeric = (str: string): string => str.replace(/\W/g, '')

export function addingAmountDecimals(number: number | string, decimals: number): string | null {
	if (!isValidNumber(number) || !isValidNumber(decimals)) return null
	let bNumber = new BigNumber(number)

	while (!bNumber.isInteger()) {
		bNumber = bNumber.times(10)
		decimals--
	}

	return bNumber.toString() + '0'.repeat(decimals)
}

export const secondsConverter = (seconds: number): string => {
	if (seconds > 60)
		return `${Math.round(seconds / 60)}m ${seconds % 60 ? `${Math.round(seconds % 60).toString()}s` : ''}`
	return `${seconds}s`
}

export const numberToFormatString = (number: number, decimals = 4, isTransformNeeded = false): string | null => {
	if (number === undefined || number === null) return null
	const result = parseFloat(number.toFixed(decimals))
	if (isTransformNeeded && result <= 0.001) return '< 0.01'
	return result?.toString()
}

export function roundNumberByDecimals(number: number | string | undefined | null, decimals = 4): string | null {
	if (!isValidNumber(number) || !isValidNumber(decimals)) return null
	const bigNumber = new BigNumber(number)
	const decimalPart = bigNumber.toString().split('.')[1]
	let count = 0
	if (decimalPart) {
		while (decimalPart[count] === '0') count++
		count++
	}
	const factor = Math.max(count, decimals)
	return bigNumber
		.toFixed(factor)
		.toString()
		.replace(/\.?0*$/, '')
}

export function addingTokenDecimals(amount: number | string, decimals: number): string | null {
	if (!isValidNumber(amount) || !isValidNumber(decimals)) return null
	const number = new BigNumber(amount).dividedBy(BigNumber(10).pow(decimals)).toString()
	return roundNumberByDecimals(number, 4)
}

export const timestampToLocalTime = (timestamp: number): number => {
	const currentTime = new Date()
	const timeZoneOffsetInSeconds = currentTime.getTimezoneOffset() * 60
	return Number(timestamp) - timeZoneOffsetInSeconds
}
interface FormatNumberOptions {
	decimals?: number
	decimalPlaces?: number
	separator?: string
	minDigits?: number
	disableUnit?: boolean
}

export function formatNumber(num: number, options: FormatNumberOptions = {}): string {
	let { decimals = 10, decimalPlaces = 4, separator, minDigits = 1, disableUnit = false } = options
	if (num === undefined || num === null) return ''

	const op = num < 0 ? '-' : ''
	num = Math.abs(num)

	if (num > 1 && !options.decimalPlaces) decimalPlaces = 2

	if (num < 0.001 && num > 0) {
		return '< 0.001'
	}

	let unit = ''
	let factor = 1

	if (!separator && !disableUnit) {
		if (num >= 1e9) {
			unit = 'B'
			factor = 1e9
		} else if (num >= 1e6) {
			unit = 'M'
			factor = 1e6
		} else if (num >= 1e3) {
			unit = 'K'
			factor = 1e3
		}
	}

	if (disableUnit && decimals) {
		factor = 10 ** decimals
	}

	let formattedNumber = num / factor
	const roundingFactor = 10 ** decimals
	formattedNumber = Math.round(formattedNumber * roundingFactor) / roundingFactor

	let [intPart, decPart] = formattedNumber.toFixed(decimalPlaces ?? decimals).split('.')

	if (separator && !unit) {
		const regex = /\B(?=(\d{3})+(?!\d))/g
		intPart = intPart.replace(regex, separator)
	}

	if (decPart && minDigits > 0) {
		while (decPart.length < minDigits) {
			decPart += '0'
		}
	}

	let result = `${op}${intPart}${decPart ? '.' : ''}${decPart || ''}`

	if (unit) {
		result += ` ${unit}`
	}

	return result
}

export const roundToPrecision = (num: number, precision: number) => {
	const factor = Math.pow(10, precision)
	return Math.round(num * factor) / factor
}

export const toLocaleNumber = (num: number | string, fixed = 0) => {
	if (num == null) return 0

	const number = Number(num)
	if (isNaN(number)) return 0

	const roundedNumber = number % 1 === 0 ? number : roundToPrecision(number, fixed)
	// To separate the display to the user of thousandths to decimal places
	return roundedNumber.toLocaleString('en-US', {
		minimumFractionDigits: fixed,
		maximumFractionDigits: fixed,
	}) // better use undefined instead 'en-US'
}
