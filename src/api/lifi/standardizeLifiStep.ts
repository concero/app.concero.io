import type * as lifiTypes from '@lifi/sdk/dist/types'
import { type Fees, type Gas, type Step } from '../../types/StandardRoute'
import { addingTokenDecimals } from '../../utils/formatting'
import { type FeeCost, type GasCost } from '@lifi/types/dist/cjs/step'

function getFees(step: lifiTypes.Step): Fees[] | [] {
	const result = step.estimate.feeCosts?.map((fee: FeeCost) => {
		return {
			amount: addingTokenDecimals(fee.amount, fee.token.decimals)!,
			asset: {
				chainId: fee.token.chainId.toString(),
				symbol: fee.token.symbol,
				decimals: fee.token.decimals,
				address: fee.token.address,
			},
		}
	})

	return result ?? []
}

function getGas(step: lifiTypes.Step): Gas[] | [] {
	const result = step.estimate.gasCosts?.map((gas: GasCost) => {
		return {
			amount: addingTokenDecimals(gas.amount, gas.token.decimals)!,
			type: gas.type,
			asset: {
				chainId: gas.token.chainId.toString(),
				symbol: gas.token.symbol,
				decimals: gas.token.decimals,
				address: gas.token.address,
			},
		}
	})

	return result ?? []
}

export const standardizeLifiStep = (step: lifiTypes.Step): Step => {
	const toDecimals = step.action.toToken.decimals

	return {
		id: step.id,
		from: {
			token: {
				name: step.action.fromToken.name,
				address: step.action.fromToken.address,
				symbol: step.action.fromToken.symbol,
				decimals: step.action.fromToken.decimals,
				price_usd: step.action.fromToken.priceUSD,
				amount: step.action.fromAmount,
				logo_uri: step.action.fromToken.logoURI ?? null,
			},
			chain: {
				id: step.action.fromChainId.toString(),
			},
		},
		to: {
			token: {
				name: step.action.toToken.name,
				address: step.action.toToken.address,
				symbol: step.action.toToken.symbol,
				decimals: step.action.toToken.decimals,
				price_usd: step.action.toToken.priceUSD,
				logo_uri: step.action.toToken.logoURI ?? null,
				amount: addingTokenDecimals(step.estimate.toAmount, toDecimals)!,
			},
			chain: {
				id: step.action.toChainId.toString(),
			},
		},
		tool: {
			name: step.toolDetails.name,
			estimated_execution_time_seconds: step.estimate.executionDuration,
			slippage_limit: step.action.slippage,
			fees: getFees(step),
			fees_usd: step.estimate.feeCosts?.reduce((acc: number, fee: FeeCost) => acc + Number(fee.amountUSD), 0) ?? 0,
			// gas: step.estimate.gasCosts?.reduce((acc: number, gas: GasCost) => acc + Number(gas.amount), 0) ?? 0,
			gas: getGas(step),
			gas_usd: step.estimate.gasCosts?.reduce((acc: number, gas: GasCost) => acc + Number(gas.amountUSD), 0) ?? 0,
			logo_uri: step.toolDetails.logoURI,
		},
	}
}
