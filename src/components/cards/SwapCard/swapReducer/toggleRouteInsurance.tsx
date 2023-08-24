import { numberToFormatString } from '../../../../utils/formatting'

const getUpdatedTokenAmountUsd = (route) => {
  return route.insurance.state === 'INSURED'
    ? numberToFormatString(parseFloat(route.to.token.amount_usd) + parseFloat(route.insurance.fee_amount_usd), 2)
    : numberToFormatString(parseFloat(route.to.token.amount_usd) - parseFloat(route.insurance.fee_amount_usd), 2)
}

const getUpdatedTokenAmount = (route) => {
  const result =
    route.insurance.state === 'INSURED'
      ? parseFloat(route.to.token.amount) +
        parseFloat(route.insurance.fee_amount_usd) * parseFloat(route.to.token.price_usd)
      : parseFloat(route.to.token.amount) -
        parseFloat(route.insurance.fee_amount_usd) * parseFloat(route.to.token.price_usd)

  if (result <= 0) return '0'

  return result
}

const getUpdatedGasUsd = (route) => {
  return route.insurance.state === 'INSURED'
    ? numberToFormatString(parseFloat(route.cost.total_gas_usd) - parseFloat(route.insurance.fee_amount_usd), 2)
    : numberToFormatString(parseFloat(route.cost.total_gas_usd) + parseFloat(route.insurance.fee_amount_usd), 2)
}

const getUpdatedRoute = (route) => {
  return {
    ...route,
    insurance: {
      ...route.insurance,
      state: route.insurance.state === 'INSURED' ? 'INSURABLE' : 'INSURED',
    },
    to: {
      ...route.to,
      token: {
        ...route.to.token,
        amount_usd: getUpdatedTokenAmountUsd(route),
        amount: getUpdatedTokenAmount(route),
      },
    },
    cost: {
      ...route.cost,
      total_gas_usd: getUpdatedGasUsd(route),
    },
    originalRoute: {
      ...route.originalRoute,
      insurance: {
        ...route.originalRoute.insurance,
        state: route.insurance.state === 'INSURED' ? 'INSURABLE' : 'INSURED',
      },
    },
  }
}

export const toggleRouteInsurance = (state: SwapState, routeId: string) => {
  return {
    ...state,
    routes: state.routes.map((route) => {
      if (route.id === routeId) {
        return getUpdatedRoute(route)
      }
      return route
    }),
    selectedRoute: state.selectedRoute?.id === routeId ? getUpdatedRoute(state.selectedRoute) : state.selectedRoute,
  }
}
