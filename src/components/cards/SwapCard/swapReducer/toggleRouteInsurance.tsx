import { numberToFormatString, roundNumberByDecimals } from '../../../../utils/formatting'

const getUpdatedTokenAmountUsd = route =>
	route.insurance.state === 'INSURED'
		? numberToFormatString(parseFloat(route.to.token.amount_usd) + parseFloat(route.insurance.fee_amount_usd), 2)
		: numberToFormatString(parseFloat(route.to.token.amount_usd) - parseFloat(route.insurance.fee_amount_usd), 2)

const getUpdatedTokenAmount = route => {
	const priceUsd = parseFloat(route.to.token.price_usd)
	const feeAmountUsd = parseFloat(route.insurance.fee_amount_usd)

	const equivalentFeeInTokens = feeAmountUsd / priceUsd

	const result = route.insurance.state === 'INSURED' ? parseFloat(route.to.token.amount) + equivalentFeeInTokens : parseFloat(route.to.token.amount) - equivalentFeeInTokens

	if (result <= 0) return '0'

	return roundNumberByDecimals(result)
}

const getUpdatedGasUsd = route =>
	route.insurance.state === 'INSURED'
		? numberToFormatString(parseFloat(route.cost.total_gas_usd) - parseFloat(route.insurance.fee_amount_usd), 2)
		: numberToFormatString(parseFloat(route.cost.total_gas_usd) + parseFloat(route.insurance.fee_amount_usd), 2)

const getUpdatedRoute = route => ({
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
})

export const toggleRouteInsurance = (state: SwapState, routeId: string) => ({
	...state,
	routes: state.routes.map(route => {
		if (route.id === routeId) {
			return getUpdatedRoute(route)
		}
		return route
	}),
	selectedRoute: state.selectedRoute?.id === routeId ? getUpdatedRoute(state.selectedRoute) : state.selectedRoute,
})
