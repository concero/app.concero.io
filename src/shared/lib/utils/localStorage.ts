export const getItem = <T>(key: string, defaultValue: T): T => {
	const storedValue = localStorage.getItem(key)
	if (storedValue === null) return defaultValue
	return JSON.parse(storedValue) as T
}
