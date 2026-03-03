import { HintedString } from '@/shared/types/utils'
import { toLocaleNumber } from '@/shared/lib/utils/formatting'

const returnValue = ['n/a'] as const

export const getUserActionPoints = (
	points?: string | number | null,
): HintedString<(typeof returnValue)[number], `${'+' | '-'}${string | number}`> => {
	if (points == 0) return '+0'
	if (!points) return 'n/a'

	const convertedPoints = Number(points)
	if (isNaN(convertedPoints)) return 'n/a'
	const sign = convertedPoints > 0 ? '+' : '-'
	const formattedDeltaValue = toLocaleNumber(Math.abs(convertedPoints), 2)
	return `${sign}${formattedDeltaValue}`
}
