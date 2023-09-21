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
    M: 'a month',
    MM: '%dm',
    y: 'a year',
    yy: '%dy',
  },
})
export default dayjs

// Date and time formatting
const formatDate = (date: string | Date, format = 'YYYY-MM-DD'): string => dayjs(date).format(format)

export const formatDateTime = (date: string | Date, format = 'YYYY-MM-DD HH:mm'): string => dayjs(date).format(format)

export const formatTime = (date: string | Date, format = 'HH:mm'): string => dayjs(date).format(format)

export const fromNow = (date: string | Date): string => dayjs(date).fromNow()

export const unixtimeFromNow = (unixtime: number): string => dayjs.unix(unixtime).fromNow()

export const unixTimeFormat = (unixtime: number, format = 'YYYY-MM-DD HH:mm'): string => dayjs.unix(unixtime).format(format)

// Number and currency formatting
// export const formatNumber = (num: number, decimalPlaces = 2): string => num.toFixed(decimalPlaces)

export const formatCurrency = (amount: number, currency = 'USD'): string => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)

// String formatting
export const toTitleCase = (str: string): string => str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())

export const toCamelCase = (str: string): string => str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''))

export const toSnakeCase = (str: string): string => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`).replace(/^-/, '')

// URL formatting
export const slugify = (str: string): string => str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')

export const getHostname = (url: string): string => new URL(url).hostname

// turns 'https://cointelegraph.com/abcd' into cointelegraph
export const getDomain = (url: string): string => getHostname(url).replace('www.', '').split('.')[0]
// String manipulation

export const truncate = (str: string, length = 100, ending = '...'): string => (str.length > length ? str.substring(0, length - ending.length) + ending : str)

// trucate wallet address to 6 characters on the end
export const truncateWallet = (str: string): string => `${str.slice(0, 6)}...${str.slice(-4)}`

export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1)

export const removeWhitespace = (str: string): string => str.replace(/\s/g, '')

export const removeNonNumeric = (str: string): string => str.replace(/\D/g, '')

export const removeNonAlphaNumeric = (str: string): string => str.replace(/\W/g, '')

export const addingDecimals = (number: number, decimals: number) => {
  while (number % 1 !== 0) {
    number *= 10
    decimals--
  }

  return number + '0'.repeat(decimals)
}

export const secondsConverter = (seconds: number): string => {
  if (seconds > 60) return `${Math.floor(seconds / 60)}m ${seconds % 60 ? `${(seconds % 60).toString()}s` : ''}`
  return `${seconds}s`
}

export const numberToFormatString = (number: number, decimals = 4, isTransformNeeded = false): string => {
  if (number === undefined || number === null) return
  const result = parseFloat(number.toFixed(decimals))
  if (isTransformNeeded && result === 0) return '< 0.01'
  return result?.toString()
}

export const roundNumberByDecimals = (number: number, decimals = 4): number => {
  const decimalPart = number.toString().split('.')[1]
  let count = 0
  if (decimalPart) {
    while (decimalPart[count] === '0') count++
    count++
  }
  const factor = Math.max(count, decimals)
  return parseFloat(number?.toFixed(factor))
}

export const addingTokenDecimals = (amount: number, decimals: number): string => numberToFormatString(amount / 10 ** decimals, 4)

export const timestampToLocalTime = (timestamp: number): number => {
  const currentTime = new Date()
  const timeZoneOffsetInSeconds = currentTime.getTimezoneOffset() * 60
  return Number(timestamp) - timeZoneOffsetInSeconds
}
type FormatNumberOptions = {
  decimals?: number
  decimalPlaces?: number
  separator?: string
  minDigits?: number
  disableUnit?: boolean
}

export function formatNumber(num: number, options: FormatNumberOptions = {}): string {
  console.log('formatNumber', num, options)
  let { decimals = 10, decimalPlaces = 4, separator, minDigits = 1, disableUnit = false } = options
  if (num === undefined || num === null) return ''

  const op = num < 0 ? '-' : ''
  num = Math.abs(num)

  if (num > 1) decimalPlaces = 2

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

// // Tests
// const tests = [
//   { num: 1234567890, options: { decimals: 0 }, expected: '1 B' },
//   { num: 12345678, options: { separator: "'", decimals: 0 }, expected: "12'345'678" },
//   { num: 12345678, options: { decimals: 2 }, expected: '12.35 M' },
//   { num: 123456, options: { decimals: 1 }, expected: '123.5 K' },
//   { num: 0.12345678, options: { decimals: 2 }, expected: '0.12' },
//   { num: 0.00012345678, options: { decimals: 3 }, expected: '< 0.001' },
//   // eth token numbers with 18 decimals
//   { num: 1234567890123456789, options: { decimals: 18, decimalPlaces: 4, disableUnit: true }, expected: '1.234567890123456690' },
//   { num: 1000000, options: { decimals: 6, decimalPlaces: 2, disableUnit: true }, expected: '1.00' },
// ]

// for (const test of tests) {
//   const result = formatNumber(test.num, test.options)
//   console.log(`Expected: ${test.expected}, Got: ${result}`)
// }
