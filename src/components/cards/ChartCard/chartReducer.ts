import { useReducer } from 'react'

const initialState = (selection) => ({
  chartType: 'coinGecko',
  token: {
    base: {
      name: selection.to.token.symbol,
      symbol: selection.to.token.symbol,
      logoURI: selection.to.token.logoURI,
      modalVisible: false,
    },
    quote: {
      name: selection.from.token.symbol,
      symbol: selection.from.token.symbol,
      logoURI: selection.from.token.logoURI,
      modalVisible: false,
    },
  },
  interval: {
    title: '1d',
    value: '1',
  },
  chartData: [],
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
      return {
        ...state,
        interval: action.payload,
      }
    case 'TOGGLE_CHART_TYPE':
      return {
        ...state,
        chartType: state.chartType === 'coinGecko' ? 'tradingView' : 'coinGecko',
      }
    case 'TOGGLE_MODAL_VISIBLE':
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
    default:
      return state
  }
}

export const useChartReducer = (selection) => useReducer(chartReducer, initialState(selection))
