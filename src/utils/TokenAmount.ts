import BigNumber from 'bignumber.js'
import { addingTokenDecimals } from './formatting'

export class TokenAmount {
	private rawAmount: string
	public decimals: number

	constructor(rawAmount: string, decimals: number) {
		this.decimals = decimals
		this.rawAmount = rawAmount
	}

	public get rounded(): string {
		return addingTokenDecimals(this.rawAmount, this.decimals) ?? ''
	}

	public get formatted(): string {
		return new BigNumber(this.rawAmount).dividedBy(BigNumber(10).pow(this.decimals)).toString()
	}

	public plus(amount: string | TokenAmount): TokenAmount {
		if (typeof amount === 'string') {
			return new TokenAmount(new BigNumber(this.formatted).plus(amount).toString(), this.decimals)
		}

		this.toCommonDecimals(this, amount)
		return new TokenAmount(new BigNumber(this.rawAmount).plus(amount.rawAmount).toString(), this.decimals)
	}

	public minus(amount: string | TokenAmount): TokenAmount {
		if (typeof amount === 'string') {
			return new TokenAmount(new BigNumber(this.formatted).minus(amount).toString(), this.decimals)
		}

		this.toCommonDecimals(this, amount)
		return new TokenAmount(new BigNumber(this.rawAmount).minus(amount.rawAmount).toString(), this.decimals)
	}

	public get raw(): string {
		return this.rawAmount ?? ''
	}

	private toCommonDecimals(amount1: TokenAmount, amount2: TokenAmount) {
		const decimalsDiff = amount1.decimals - amount2.decimals

		if (decimalsDiff > 0) {
			amount2.rawAmount = new BigNumber(amount2.rawAmount)
				.multipliedBy(BigNumber(10).pow(decimalsDiff))
				.toString()
			amount2.decimals = amount1.decimals
		} else if (decimalsDiff < 0) {
			amount1.rawAmount = new BigNumber(amount1.rawAmount)
				.multipliedBy(BigNumber(10).pow(-decimalsDiff))
				.toString()
			amount1.decimals = amount2.decimals
		}
	}
}
