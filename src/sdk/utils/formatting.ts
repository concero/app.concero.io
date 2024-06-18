import BigNumber from 'bignumber.js'

export function isValidNumber(number: string | number) {
	if (typeof number === 'string') {
		return number !== ''
	} else {
		return !(number === undefined || number === null || isNaN(number))
	}
}

export function addingAmountDecimals(number: number | string, decimals: number): string | null {
	if (!isValidNumber(number) || !isValidNumber(decimals)) return null
	let bNumber = new BigNumber(number)

	while (!bNumber.isInteger()) {
		bNumber = bNumber.times(10)
		decimals--
	}

	return bNumber.toString() + '0'.repeat(decimals)
}

export const createBigIntAmount = (amount: string, decimals: number) => {
	return BigInt(addingAmountDecimals(amount, decimals)!)
}
