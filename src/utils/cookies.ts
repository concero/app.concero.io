export const setCookie = (name: string, value: string, days = 7): void => {
	const expires = new Date(Date.now() + days * 86400000).toUTCString()
	document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`
}

export const getCookie = (name: string): string | null => {
	const matches = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`))
	return matches ? decodeURIComponent(matches[1]) : null
}

export const deleteCookie = (name: string): void => {
	setCookie(name, '', -1)
}

export const isCookieSet = (name: string): boolean => getCookie(name) !== null

export const clearCookies = (): void => {
	const cookies = document.cookie.split('; ')
	for (const cookie of cookies) {
		const [name] = cookie.split('=')
		deleteCookie(name)
	}
}

export const getAllCookies = (): Record<string, string> => {
	const cookies = document.cookie.split('; ')
	const result: Record<string, string> = {}
	for (const cookie of cookies) {
		const [name, value] = cookie.split('=')
		result[name] = decodeURIComponent(value)
	}
	return result
}
