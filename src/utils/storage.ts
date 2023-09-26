import * as localStorageUtils from './localStorage'
import * as cookieUtils from './cookies'

export type StorageType = 'localStorage' | 'cookie'

export const setItem = (key: string, value: any, storageType: StorageType = 'localStorage'): void => {
	if (storageType === 'localStorage') {
		localStorageUtils.setItem(key, value)
	} else if (storageType === 'cookie') {
		cookieUtils.setCookie(key, JSON.stringify(value))
	}
}

export const getItem = <T>(key: string, defaultValue: T, storageType: StorageType = 'localStorage'): T => {
	if (storageType === 'localStorage') {
		return localStorageUtils.getItem(key, defaultValue)
	}
	if (storageType === 'cookie') {
		const cookieValue = cookieUtils.getCookie(key)
		return cookieValue ? JSON.parse(cookieValue) : defaultValue
	}
	return defaultValue
}

export const removeItem = (key: string, storageType: StorageType = 'localStorage'): void => {
	if (storageType === 'localStorage') {
		localStorageUtils.removeItem(key)
	} else if (storageType === 'cookie') {
		cookieUtils.deleteCookie(key)
	}
}

export const clearStorage = (storageType: StorageType = 'localStorage'): void => {
	if (storageType === 'localStorage') {
		localStorageUtils.clearStorage()
	} else if (storageType === 'cookie') {
		const allCookies = cookieUtils.getAllCookies()
		for (const key in allCookies) {
			cookieUtils.deleteCookie(key)
		}
	}
}
