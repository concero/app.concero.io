import BigNumber from 'bignumber.js'
import { addingTokenDecimals } from './formatting'

export class TokenAmount {
	private readonly rawAmount: string | undefined
	public decimals: number | undefined

	constructor(rawAmount: string, decimals: number) {
		this.decimals = decimals
		this.rawAmount = rawAmount
	}

	public get rounded(): string {
		return addingTokenDecimals(this.rawAmount!, this.decimals!) ?? ''
	}

	public get formatted(): string {
		return new BigNumber(this.rawAmount!).dividedBy(BigNumber(10).pow(this.decimals!)).toString()
	}

	public get raw(): string {
		return this.rawAmount ?? ''
	}
}
