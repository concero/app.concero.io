import { roundNumberByDecimals } from '../../utils/formatting'

describe('roundNumberByDecimals', () => {
	it('should round a number with default decimals', () => {
		expect(roundNumberByDecimals(3.14159265)).toBe(3.1416)
	})

	it('should round a number with custom decimals', () => {
		expect(roundNumberByDecimals(3.14159265, 2)).toBe(3.14)
	})

	it('should round a number with custom decimals', () => {
		expect(roundNumberByDecimals(3.00000000000005, 2)).toBe(3.00000000000005)
	})

	it('should round a number without trailing zeros', () => {
		expect(roundNumberByDecimals(3.1000001)).toBe(3.1)
	})

	it('should handle negative numbers', () => {
		expect(roundNumberByDecimals(-2.71828183, 3)).toBe(-2.718)
	})

	it('should return NaN for invalid input', () => {
		expect(roundNumberByDecimals(NaN)).toBeNaN()
	})

	it('should handle edge case of no decimal part', () => {
		expect(roundNumberByDecimals(42)).toBe(42)
	})
})
