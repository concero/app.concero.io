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
		return addingTokenDecimals(this.rawAmount as string, this.decimals as number) ?? ''
	}

	public get formatted(): string {
		return new BigNumber(this.rawAmount as string).dividedBy(BigNumber(10).pow(this.decimals as number)).toString()
	}

	public get raw(): string {
		return this.rawAmount ?? ''
	}
}
