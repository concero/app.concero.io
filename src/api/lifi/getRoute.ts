import * as types from '@lifi/sdk/dist/types'
import { getRouteStep } from './getRouteStep'
import { Route } from './types'

export const getRoute = (route: types.Route): Route => {
  return {
    id: route.id,
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
    },
    to: {
      token: {
        name: route.toToken.name,
        address: route.toToken.address,
        symbol: route.toToken.symbol,
        decimals: route.toToken.decimals,
        price_usd: route.toToken.priceUSD,
        amount_usd: route.toAmountUSD,
        amount: route.toAmount,
        amount_min: route.toAmountMin,
      },
      chain: {
        id: route.toChainId,
      },
    },
    steps: [
      ...route.steps.map((step) => getRouteStep(step)),
      ...route.steps.flatMap((step) => step.includedSteps.map((includedStep) => getRouteStep(includedStep))),
    ],
    cost: {
      total_usd: Number(route.fromAmountUSD) - Number(route.toAmountUSD),
      total_gas_usd: route.gasCostUSD,
    },
    tags: route.tags,
    slippage_percent: route.steps.reduce(
      (acc, step) =>
        acc +
        (step.action.slippage +
          step.includedSteps.reduce((innerAcc: number, innerStep) => innerAcc + innerStep.action.slippage, 0)),
      0,
    ),
    transaction_time_seconds: route.steps.reduce(
      (acc: number, step) =>
        acc +
        (step.estimate.executionDuration +
          step.includedSteps.reduce(
            (innerAcc: number, innerStep) => innerAcc + innerStep.estimate.executionDuration,
            0,
          )),
      0,
    ),
  }
}
