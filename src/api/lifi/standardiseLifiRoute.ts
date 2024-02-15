import type * as lifiTypes from '@lifi/sdk/dist/types'
import { standardizeLifiStep } from './standardizeLifiStep'
import { type Fees, type Step } from '../../types/StandardRoute'
import BigNumber from 'bignumber.js'
import { addingTokenDecimals, roundNumberByDecimals } from '../../utils/formatting'
import { type FeeCost, type GasCost } from '@lifi/types/dist/cjs/step'
import { type LifiStep } from '@lifi/types/dist/cjs'

function getTotalFee(route: lifiTypes.Route): Fees[] | [] {
	const result: Fees[] = []

	route.steps.forEach((step: LifiStep) => {
		step.estimate.feeCosts?.forEach((fee: FeeCost) => {
			if (fee.included) return
			const matchedFeeAsset = result.find(
				(item: Fees) => item.asset.address === fee.token.address && item.asset.chainId === fee.token.chainId.toString(),
			)
			if (matchedFeeAsset) {
				const index = result.findIndex((item: Fees) => item.asset.address === fee.token.address)
				const normalizedFeeAmount = addingTokenDecimals(fee.amount, fee.token.decimals)
				result[index].amount = new BigNumber(result[index].amount).plus(normalizedFeeAmount!).toString()
			} else {
				const normalizedFeeAmount = addingTokenDecimals(fee.amount, fee.token.decimals)
				result.push({
					amount: normalizedFeeAmount!,
					asset: {
						chainId: fee.token.chainId.toString(),
						symbol: fee.token.symbol,
						address: fee.token.address,
					},
				})
			}
		})
	})

	route.steps.forEach((step: LifiStep) => {
		step.estimate.gasCosts?.forEach((gas: GasCost) => {
			if (
				result.find(
					(item: Fees) => item.asset.address === gas.token.address && item.asset.chainId === gas.token.chainId.toString(),
				)
			) {
				const index = result.findIndex((item: Fees) => item.asset.address === gas.token.address)
				const normalizedGasAmount = addingTokenDecimals(gas.amount, gas.token.decimals)
				result[index].amount = new BigNumber(result[index].amount).plus(normalizedGasAmount!).toString()
			} else {
				const normalizedGasAmount = addingTokenDecimals(gas.amount, gas.token.decimals)
				result.push({
					amount: normalizedGasAmount!,
					asset: {
						chainId: gas.token.chainId.toString(),
						symbol: gas.token.symbol,
						address: gas.token.address,
					},
				})
			}
		})
	})

	return result
}

function getFeeAmountUsd(route: lifiTypes.Route): number {
	let amount: number = 0

	route.steps.forEach((step: LifiStep) => {
		step.estimate.feeCosts?.forEach((fee: FeeCost) => {
			if (fee.included) return
			amount += parseFloat(fee.amountUSD)
		})
	})

	return amount
}

export const standardiseLifiRoute = (
	route: lifiTypes.Route,
): {
	insurance: { fee_amount_usd: string; state: 'INSURED' | 'INSURABLE' | 'NOT_INSURABLE' }
	execution: Array<Execution | undefined>
	cost: {
		total_usd: string | null
		total_gas_usd: string | undefined
		total_fee: Fees[] | []
		total_fee_usd: string
	}
	slippage_percent: number
	provider: string
	transaction_time_seconds: number
	from: {
		chain: { id: number }
		address: string | undefined
		token: {
			price_usd: string
			symbol: string
			amount: string
			address: string
			decimals: number
			name: string
			amount_usd: string
		}
	}
	id: string
	to: {
		chain: { id: number }
		address: string | undefined
		token: {
			price_usd: string
			symbol: string
			amount: string | null
			address: string
			decimals: number
			name: string
			amount_usd: string
		}
	}
	steps: Array<SwapStep | CrossStep | CustomStep | ProtocolStep>
	tags: Order[] | undefined
	originalRoute: Route
} => ({
	id: route.id,
	provider: 'lifi',
	from: {
		token: {
			name: route.fromToken.name,
			address: route.fromToken.address,
			symbol: route.fromToken.symbol,
			decimals: route.fromToken.decimals,
			price_usd: route.fromToken.priceUSD,
			amount_usd: route.fromAmountUSD,
			amount: route.fromAmount,
		},
		chain: {
			id: route.fromChainId,
		},
		address: route.fromAddress,
	},
	to: {
		token: {
			name: route.toToken.name,
			address: route.toToken.address,
			symbol: route.toToken.symbol,
			decimals: route.toToken.decimals,
			price_usd: route.toToken.priceUSD,
			amount_usd: route.toAmountUSD,
			amount: addingTokenDecimals(route.toAmount, route.toToken.decimals),
		},
		chain: {
			id: route.toChainId,
		},
		address: route.toAddress,
	},
	steps: [
		...route.steps.map(step => {
			const acc: Step[] = []
			step.includedSteps.forEach((includedStep: lifiTypes.Step) => {
				const res = standardizeLifiStep(includedStep)
				if (res) {
					acc.push(res)
				}
			})
			return acc
		}),
	],
	cost: {
		total_usd: roundNumberByDecimals(new BigNumber(route.fromAmountUSD).minus(route.toAmountUSD).toString(), 2),
		total_gas_usd: route.gasCostUSD,
		total_fee: getTotalFee(route),
		total_fee_usd: roundNumberByDecimals(getFeeAmountUsd(route) + parseFloat(route.gasCostUSD!), 2)!,
	},
	tags: route.tags,
	insurance: {
		state: route.insurance.state,
		fee_amount_usd: route.insurance.feeAmountUsd,
	},

	slippage_percent: route.steps.reduce(
		(acc, step) =>
			acc +
			(step.action.slippage +
				step.includedSteps.reduce((innerAcc: number, innerStep) => {
					return innerAcc + innerStep.action.slippage
				}, 0)),
		0,
	),
	transaction_time_seconds: route.steps.reduce(
		(acc: number, step) =>
			acc +
			step.includedSteps.reduce((innerAcc: number, innerStep) => {
				return innerAcc + innerStep.estimate.executionDuration
			}, 0),
		0,
	),
	execution: route.steps.map(step => step.execution),
	originalRoute: route,
})
