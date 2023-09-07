export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        data: action.payload,
      }
    case 'SET_CHART_TYPE':
      return {
        ...state,
        chartType: action.payload,
      }
    case 'SET_RESPONSE':
      return {
        ...state,
        response: action.payload,
      }
    default:
      throw new Error('Invalid action type')
  }
}
