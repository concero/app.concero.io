import * as types from '@lifi/sdk/dist/types'
import { getRouteStep } from './getRouteStep'
import { Route } from './types'

export const standardiseLifiRoute = (route: types.Route): Route => ({
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
  },
  to: {
    token: {
      name: route.toToken.name,
      address: route.toToken.address,
      symbol: route.toToken.symbol,
      decimals: route.toToken.decimals,
      price_usd: route.toToken.priceUSD,
      amount_usd: route.toAmountUSD,
      amount: parseFloat((Number(route.toAmount) / 10 ** route.toToken.decimals).toFixed(4)).toString(),
      amount_min: route.toAmountMin,
    },
    chain: {
      id: route.toChainId,
    },
  },
  steps: [...route.steps.flatMap((step) => step.includedSteps.map((includedStep) => getRouteStep(includedStep)))],
  cost: {
    total_usd: Number(route.fromAmountUSD) - Number(route.toAmountUSD),
    total_gas_usd: route.gasCostUSD,
  },
  tags: route.tags,
  insurance: {
    state: route.insurance.state,
    fee_amount_usd: route.insurance.feeAmountUsd,
  },
  slippage_percent: route.steps.reduce(
    (acc, step) => acc + (step.action.slippage + step.includedSteps.reduce((innerAcc: number, innerStep) => innerAcc + innerStep.action.slippage, 0)),
    0,
  ),
  transaction_time_seconds: route.steps.reduce(
    (acc: number, step) => acc + step.includedSteps.reduce((innerAcc: number, innerStep) => innerAcc + innerStep.estimate.executionDuration, 0),
    0,
  ),
  // execution: route.steps.map((step) => step.execution),
  execution: [
    {
      status: 'DONE',
      process: [
        {
          type: 'CROSS_CHAIN',
          startedAt: 1693583961759,
          message: 'Bridge transaction confirmed.',
          status: 'DONE',
          txHash: '0xa2b6d3b00e0a1d789ce5fe6fdcc456dac9822f93e80bd4b9edab84078e25e813',
          txLink: 'https://polygonscan.com/tx/0xa2b6d3b00e0a1d789ce5fe6fdcc456dac9822f93e80bd4b9edab84078e25e813',
          doneAt: 1693584068925,
        },
        {
          type: 'RECEIVING_CHAIN',
          startedAt: 1693584068925,
          message: 'Bridge completed.',
          status: 'ACTION_REQUIRED',
          substatus: 'COMPLETED',
          substatusMessage: 'The transfer is complete.',
          txLink: 'https://bscscan.com/tx/0x30927aeff77ac5caad490bda870d618fe9abfda922d944e362d6e9326d14a58c',
          doneAt: 1693584536648,
          txHash: '0x30927aeff77ac5caad490bda870d618fe9abfda922d944e362d6e9326d14a58c',
        },
        {
          type: 'RECEIVING_CHAIN',
          startedAt: 1693584068925,
          message: 'Bridge completed.',
          status: 'pending',
          substatus: 'COMPLETED',
          substatusMessage: 'The transfer is complete.',
          txLink: 'https://bscscan.com/tx/0x30927aeff77ac5caad490bda870d618fe9abfda922d944e362d6e9326d14a58c',
          doneAt: 1693584536648,
          txHash: '0x30927aeff77ac5caad490bda870d618fe9abfda922d944e362d6e9326d14a58c',
        },
      ],
      fromAmount: '1000000000000000000',
      toAmount: '463303999999999994',
      toToken: {
        address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        chainId: 56,
        symbol: 'BUSD',
        decimals: 18,
        name: 'BUSD',
        priceUSD: '1.0002',
        logoURI: 'https://static.debank.com/image/bsc_token/logo_url/0xe9e7cea3dedca5984780bafc599bd69add087d56/588ad5043e23b6c46aeda945852c3273.png',
        coinKey: 'BUSD',
      },
      gasAmount: '57899001181642000',
      gasAmountUSD: '0.03',
      gasPrice: '113967681400',
      gasToken: {
        address: '0x0000000000000000000000000000000000000000',
        chainId: 137,
        symbol: 'MATIC',
        decimals: 18,
        name: 'MATIC',
        priceUSD: '0.539696',
        logoURI: 'https://static.debank.com/image/matic_token/logo_url/matic/6f5a6b6f0732a7a235131bd7804d357c.png',
        coinKey: 'MATIC',
      },
      gasUsed: '508030',
    },
  ],
  originalRoute: route,
})
