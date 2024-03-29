import { useReducer } from 'react'
import { trackEvent } from '../../../hooks/useTracking'
import { action as trackingAction, category as trackingCategory } from '../../../constants/tracking'

const initialState = selection => ({
	chartType: 'coinGecko',
	token: {
		base: {
			name: selection.to.token.symbol,
			symbol: selection.to.token.symbol,
			logoURI: selection.to.token.logoURI,
			coinGeckoId: selection.to.token.coinGeckoId,
			modalVisible: false,
		},
		quote: {
			name: selection.from.token.symbol,
			symbol: selection.from.token.symbol,
			logoURI: selection.from.token.logoURI,
			coinGeckoId: selection.from.token.coinGeckoId,
			modalVisible: false,
		},
	},
	interval: {
		title: '1m',
		value: '30',
	},
	chartData: [],
	isLoading: false,
})

const chartReducer = (state, action) => {
	switch (action.type) {
		case 'SET_TOKEN':
			return {
				...state,
				token: {
					...state.token,
					[action.tokenType]: {
						...state.token[action.tokenType],
						...action.payload,
					},
				},
			}
		case 'SET_INTERVAL':
			trackEvent({
				category: trackingCategory.ChartCard,
				action: trackingAction.SetChartInterval,
				label: 'set_chart_interval',
				data: { interval: action.payload },
			})
			return {
				...state,
				interval: action.payload,
			}
		case 'TOGGLE_CHART_TYPE':
			const newChartType = state.chartType === 'coinGecko' ? 'tradingView' : 'coinGecko'
			trackEvent({
				category: trackingCategory.ChartCard,
				action: trackingAction.ToggleChart,
				label: 'toggle_chart_type',
				data: { chartType: newChartType },
			})
			return {
				...state,
				chartType: newChartType,
			}
		case 'TOGGLE_MODAL_VISIBLE':
			trackEvent({
				category: trackingCategory.ChartCard,
				action: trackingAction.ToggleChartModalVisible,
				label: 'toggle_chart_modal_visible',
			})
			return {
				...state,
				token: {
					...state.token,
					[action.tokenType]: {
						...state.token[action.tokenType],
						modalVisible: !state.token[action.tokenType].modalVisible,
					},
				},
			}
		case 'SET_CHART_DATA':
			return {
				...state,
				chartData: action.payload,
			}
		case 'SET_LOADING':
			return {
				...state,
				isLoading: action.payload,
			}
		default:
			throw new Error(`Unhandled action type: ${action.type}`)
	}
}

export const useChartReducer = selection => useReducer(chartReducer, initialState(selection))
