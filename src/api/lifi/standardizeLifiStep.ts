import { type Fees, type Gas, type Step, type StepTypes } from '../../types/StandardRoute'
import { addingTokenDecimals } from '../../utils/formatting'
import { type FeeCost, type GasCost } from '@lifi/types/dist/cjs/step'
import type * as lifiTypes from '@lifi/sdk/dist/types'
import { config } from '../../constants/config'

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

export function standardizeLifiStep(step: lifiTypes.Step): Step {
	const toDecimals = step.action.toToken.decimals

	return {
		id: step.id,
		type: step.type as StepTypes,
		from: {
			token: {
				name: step.action.fromToken.name,
				address: step.action.fromToken.address,
				symbol: step.action.fromToken.symbol,
				decimals: step.action.fromToken.decimals,
				price_usd: step.action.fromToken.priceUSD,
				amount: addingTokenDecimals(step.action.fromAmount, step.action.fromToken.decimals)!,
				logo_uri: step.action.fromToken.logoURI ?? null,
				amount_usd: step.estimate.fromAmountUSD,
			},
			chain: {
				id: step.action.fromChainId.toString(),
				logo_uri: `${config.CONCERO_ASSETS_URI}/icons/chains/filled/${step.action.fromChainId.toString()}.svg`,
			},
			address: step.action.fromAddress,
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
				amount_usd: step.estimate.toAmountUSD,
			},
			chain: {
				id: step.action.toChainId.toString(),
				logo_uri: `${config.CONCERO_ASSETS_URI}/icons/chains/filled/${step.action.toChainId.toString()}.svg`,
			},
			address: step.action.toAddress,
		},
		tool: {
			name: step.toolDetails.name,
			estimated_execution_time_seconds: step.estimate.executionDuration,
			slippage_limit: step.action.slippage,
			fees: getFees(step),
			fees_usd: step.estimate.feeCosts?.reduce((acc: number, fee: FeeCost) => acc + Number(fee.amountUSD), 0) ?? 0,
			gas: getGas(step),
			gas_usd: step.estimate.gasCosts?.reduce((acc: number, gas: GasCost) => acc + Number(gas.amountUSD), 0) ?? 0,
			logo_uri: step.toolDetails.logoURI,
		},
	}
}
