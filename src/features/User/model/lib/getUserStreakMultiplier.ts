export const week = 7
export const month = 30

const userMultiplierMap = {
	week: 1.5,
	'1month': 2,
	'2month': 2.5,
	'3month': 3,
	'4month': 4,
}

export const getUserMultiplier = (streakDays: number) => {
	let multiplier = 0

	if (streakDays >= week) {
		multiplier = userMultiplierMap.week
	}
	if (streakDays >= week + month) {
		multiplier = userMultiplierMap['1month']
	}
	if (streakDays >= week + month * 2) {
		multiplier = userMultiplierMap['2month']
	}
	if (streakDays >= week + month * 3) {
		multiplier = userMultiplierMap['3month']
	}
	if (streakDays >= month * 4) {
		multiplier = userMultiplierMap['4month']
	}

	return multiplier
}
export const getUserFutureMultiplier = (streakDays: number) => {
	let multiplier = 1.5

	if (streakDays >= week) {
		multiplier = userMultiplierMap['1month']
	}
	if (streakDays >= week + month) {
		multiplier = userMultiplierMap['2month']
	}
	if (streakDays >= week + month * 2) {
		multiplier = userMultiplierMap['3month']
	}
	if (streakDays >= week + month * 3) {
		multiplier = userMultiplierMap['4month']
	}

	return multiplier
}
