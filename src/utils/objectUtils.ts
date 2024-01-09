// Array utilities
export const arrayUnique = <T>(array: T[]): T[] => [...new Set(array)]

export const arrayRemove = <T>(array: T[], value: T): T[] => array.filter(item => item !== value)

export const arrayToObject = <T>(array: T[], key: keyof T): Record<string, T> =>
	array.reduce<Record<string, T>>((accumulator, item) => {
		accumulator[String(item[key])] = item
		return accumulator
	}, {})

// Object utilities
export const objectToArray = <T>(object: Record<string, T>): T[] => Object.values(object)

export const objectDeepMerge = (target: Record<string, any>, source: Record<string, any>): Record<string, any> => {
	const output = { ...target }
	for (const key in source) {
		if (source.hasOwnProperty(key)) {
			if (isObject(source[key]) && isObject(target[key])) {
				output[key] = objectDeepMerge(target[key], source[key])
			} else {
				output[key] = source[key]
			}
		}
	}
	return output
}

export const isObject = (item: any): boolean => item && typeof item === 'object' && !Array.isArray(item)
