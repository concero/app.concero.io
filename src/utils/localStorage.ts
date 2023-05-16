export const setItem = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getItem = <T>(key: string, defaultValue: T): T => {
  const storedValue = localStorage.getItem(key)
  if (storedValue === null) return defaultValue
  return JSON.parse(storedValue) as T
}

export const removeItem = (key: string): void => {
  localStorage.removeItem(key)
}

export const isItemSet = (key: string): boolean => localStorage.getItem(key) !== null

export const clearStorage = (): void => {
  localStorage.clear()
}

export const getStorageLength = (): number => JSON.stringify(localStorage).length

export const getStorageRemaining = (): number => 5242880 - getStorageLength()
