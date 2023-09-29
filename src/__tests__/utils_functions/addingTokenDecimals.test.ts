import { addingTokenDecimals } from '../../utils/formatting'
import { bigNumberSettings } from '../../utils/bigNumberSettings'

bigNumberSettings()

describe('addingTokenDecimals', () => {
	it('should handle numbers without decimals', () => {
		expect(addingTokenDecimals('2377240483', 18)).toBe('0.000000002')
		expect(addingTokenDecimals('1000000000', 9)).toBe('1')
		expect(addingTokenDecimals('1234567890', 0)).toBe('1234567890')
		expect(addingTokenDecimals('9876543210', 12)).toBe('0.0099')
	})

	it('should handle zero decimals', () => {
		expect(addingTokenDecimals('2377240483', 0)).toBe('2377240483')
		expect(addingTokenDecimals('1000000000', 0)).toBe('1000000000')
	})

	it('should handle maximum decimals', () => {
		expect(addingTokenDecimals('12345', 18)).toBe('0.00000000000001')
		expect(addingTokenDecimals('95838876798487546548546564654', 9)).toBe('95838876798487546548.5466')
	})

	it('should handle decimals', () => {
		expect(addingTokenDecimals('-123456', 6)).toBe('-0.1235')
		expect(addingTokenDecimals(null, 6)).toBe(null)
		expect(addingTokenDecimals('', 6)).toBe(null)
		expect(addingTokenDecimals(0, 6)).toBe('0')
	})

	it('should return null', () => {
		expect(addingTokenDecimals(546456, null)).toBe(null)
		expect(addingTokenDecimals(546456, undefined)).toBe(null)
		expect(addingTokenDecimals(null, NaN)).toBe(null)
		expect(addingTokenDecimals('', 18)).toBe(null)
	})
})
