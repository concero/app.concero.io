import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

// Date and time formatting
export const formatDate = (date: string | Date, format = 'YYYY-MM-DD'): string => dayjs(date).format(format)

export const formatDateTime = (date: string | Date, format = 'YYYY-MM-DD HH:mm'): string => dayjs(date).format(format)

export const formatTime = (date: string | Date, format = 'HH:mm'): string => dayjs(date).format(format)

export const fromNow = (date: string | Date): string => dayjs(date).fromNow()

// Number and currency formatting
export const formatNumber = (num: number, decimalPlaces = 2): string => num.toFixed(decimalPlaces)

export const formatCurrency = (amount: number, currency = 'USD'): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)

// String formatting
export const toTitleCase = (str: string): string =>
  str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())

export const toCamelCase = (str: string): string =>
  str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''))

export const toSnakeCase = (str: string): string =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`).replace(/^-/, '')

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
export const truncateWallet = (str: string): string => `${str.slice(0, 6)}...${str.slice(-4)}`

export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1)

export const removeWhitespace = (str: string): string => str.replace(/\s/g, '')

export const removeNonNumeric = (str: string): string => str.replace(/\D/g, '')

export const removeNonAlphaNumeric = (str: string): string => str.replace(/\W/g, '')

export const addingDecimals = (number: number, decimals: number) => {
  while (number % 1 !== 0) {
    number = number * 10
    decimals--
  }

  return number + '0'.repeat(decimals)
}

export const secondsConverter = (seconds: number): string => {
  if (seconds > 60) return `${Math.floor(seconds / 60)}m ${seconds % 60 ? (seconds % 60).toString() + 's' : ''}`
  return `${seconds}s`
}

export const numberToFormatString = (number: number, decimals = 4): string => {
  return parseFloat(number.toFixed(decimals)).toString()
}
