import dayjs from 'dayjs'

// Date and time formatting
export const formatDate = (date: string | Date, format = 'YYYY-MM-DD'): string => {
  return dayjs(date).format(format)
}

export const formatDateTime = (date: string | Date, format = 'YYYY-MM-DD HH:mm'): string => {
  return dayjs(date).format(format)
}

export const formatTime = (date: string | Date, format = 'HH:mm'): string => {
  return dayjs(date).format(format)
}

export const fromNow = (date: string | Date): string => {
  return dayjs(date).fromNow()
}

// Number and currency formatting
export const formatNumber = (num: number, decimalPlaces = 2): string => {
  return num.toFixed(decimalPlaces)
}

export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
}

// String formatting
export const toTitleCase = (str: string): string => {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}

export const toCamelCase = (str: string): string => {
  return str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''))
}

export const toSnakeCase = (str: string): string => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`).replace(/^-/, '')
}

// URL formatting
export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
}
export const getHostname = (url: string): string => {
  return new URL(url).hostname
}

// turns 'https://cointelegraph.com/abcd' into cointelegraph
export const getDomain = (url: string): string => {
  return getHostname(url).replace('www.', '').split('.')[0]
}
// String manipulation

export const truncate = (str: string, length = 100, ending = '...'): string => {
  return str.length > length ? str.substring(0, length - ending.length) + ending : str
}

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const removeWhitespace = (str: string): string => {
  return str.replace(/\s/g, '')
}

export const removeNonNumeric = (str: string): string => {
  return str.replace(/\D/g, '')
}

export const removeNonAlphaNumeric = (str: string): string => {
  return str.replace(/\W/g, '')
}
