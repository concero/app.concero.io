/**
 * Rounds number Y down (towards negative infinity)
 * to the number of decimal places defined by number X.
 *
 * Example:
 *   roundDownToPrecision(5.6789, 1.23) -> 5.67  // X has 2 decimals
 *   roundDownToPrecision(5.6789, 1.2)  -> 5.6   // X has 1 decimal
 *   roundDownToPrecision(5.6789, 1)    -> 5     // X has 0 decimals
 *
 * @param y The number to be rounded
 * @param x The number that defines the precision (decimal places)
 * @returns Y rounded down to the precision of X
 */

export const roundDownToPrecision = (y: number, x: number): number => {
	const decimals = (x.toString().split('.')[1] || '').length
	const factor = 10 ** decimals
	return Math.floor(y * factor) / factor
}
