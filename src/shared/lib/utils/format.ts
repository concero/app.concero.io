import { formatUnits } from 'viem'

/**
 * Formats a number to a specified number of decimal places.
 * If the value is less than the threshold defined by the decimal places,
 * it returns a string representation of the threshold value.
 * Otherwise, it formats the number to the specified number of decimal places,
 * removing any trailing zeros.
 * @param value - The number to format.
 * @param decimalPlaces - The number of decimal places to include.
 * @returns The formatted number as a string.
 */
export function format(value: number, decimalPlaces: number = 2, symbol?: string): string {
	if (value === 0) return '0'

	const absValue = Math.abs(value)
	const formattedValue =
		absValue < Number(`0.${'0'.repeat(decimalPlaces - 1)}1`)
			? `<${symbol || ''}0.${'0'.repeat(decimalPlaces - 1)}1`
			: `${symbol || ''}${absValue.toFixed(decimalPlaces).replace(/\.?0+$/, '')}`

	return value < 0 ? `-${formattedValue}` : formattedValue
}
/**
 * Formats a token amount to at least 6 decimals.
 * @param amount - The amount to format.
 * @param decimals - The number of decimals for the token.
 * @returns The formatted amount as a string.
 */
export function formatTokenAmount(amount: string | undefined, decimals: number = 18): string {
	if (!amount || isNaN(Number(amount))) {
		return '0'
	}

	const formattedAmount = formatUnits(BigInt(amount), decimals)
	const parsedAmount = Number.parseFloat(formattedAmount)
	if (!parsedAmount || Number.isNaN(Number(formattedAmount))) {
		return '0'
	}

	return parsedAmount.toString()
}
