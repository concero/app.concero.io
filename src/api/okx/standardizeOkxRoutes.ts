import { StandardRoute, Step } from '../../types/StandardRoute'
import { generateId } from '../../utils/generateId'
import { OKXRoute, RouterList } from './types'
import { config } from '../../constants/config'

function getTransactionTimeSeconds(route: OKXRoute): number {
	let executionTime = 0
	route.routerList.forEach((i: RouterList) => {
		executionTime += Number(i.estimateTime)
	})
	return executionTime
}

function getSteps(route: OKXRoute): Step[] {
	return route.routerList.map((item: RouterList) => {
		return {
			id: generateId(),
			from: {
				token: {
					name: route.fromToken.tokenSymbol,
					address: route.fromToken.tokenContractAddress,
					symbol: route.fromToken.tokenSymbol,
					decimals: route.fromToken.decimals,
					amount: route.fromTokenAmount,
					amount_usd: null,
					logo_uri: null,
				},
				chain: {
					id: route.fromChainId,
				},
			},
			to: {
				token: {
					name: route.toToken.tokenSymbol,
					address: route.toToken.tokenContractAddress,
					symbol: route.toToken.tokenSymbol,
					decimals: route.toToken.decimals,
					amount: item.toTokenAmount,
					amount_usd: null,
					logo_uri: null,
				},
				chain: {
					id: route.toChainId,
				},
			},
			tool: {
				name: item.fromDexRouterList[0].bridgeName,
				estimated_execution_time_seconds: Number(item.estimateTime),
				slippage_percent: null,
				fees: [
					{
						amount: item.estimateGasFee,
						asset: {
							chainId: route.fromChainId,
							symbol: route.fromToken.tokenSymbol,
							address: config.NULL_ADDRESS,
						},
					},
				],
			},
		}
	})
}

export function standardizeOkxRoutes(okxRoutes: OKXRoute[]): StandardRoute[] {
	return okxRoutes.map<StandardRoute>((route: OKXRoute): StandardRoute => {
		return {
			id: generateId(),
			provider: 'okx',
			from: {
				token: {
					name: route.fromToken.tokenSymbol,
					address: route.fromToken.tokenContractAddress,
					symbol: route.fromToken.tokenSymbol,
					decimals: route.fromToken.decimals,
					amount: route.fromTokenAmount,
					amount_usd: null,
				},
				chain: {
					id: route.fromChainId,
				},
			},
			to: {
				token: {
					name: route.toToken.tokenSymbol,
					address: route.toToken.tokenContractAddress,
					symbol: route.toToken.tokenSymbol,
					decimals: route.toToken.decimals,
					amount: route.routerList[0].toTokenAmount,
					amount_usd: null,
				},
				chain: {
					id: route.toChainId,
				},
			},
			steps: getSteps(route),
			cost: {
				total_usd: null,
				total_gas_usd: null,
				total_fee: [],
			},
			tags: [],
			slippage_percent: null,
			transaction_time_seconds: getTransactionTimeSeconds(route),
			originalRoute: route,
		}
	})
}
