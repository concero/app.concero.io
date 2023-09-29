import BigNumber from 'bignumber.js'

export function bigNumberSettings() {
	BigNumber.config({ EXPONENTIAL_AT: 1e9 })
}
