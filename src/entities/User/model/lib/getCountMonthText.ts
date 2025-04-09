export const getCountMonthText = (countMonth: number) => {
	const exceptions = [11, 12, 13]
	const lastDigit = countMonth % 10
	const lastTwoDigits = countMonth % 100

	if (exceptions.includes(lastTwoDigits)) {
		return `${countMonth}th month`
	}

	switch (lastDigit) {
		case 1:
			return `${countMonth}st month`
		case 2:
			return `${countMonth}nd month`
		case 3:
			return `${countMonth}rd month`
		default:
			return `${countMonth}th month`
	}
}
