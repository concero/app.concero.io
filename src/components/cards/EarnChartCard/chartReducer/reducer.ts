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
		case 'SET_IS_TYPE_MODAL_VISIBLE':
			return {
				...state,
				isTypeModalVisible: action.payload,
			}
		case 'SET_LOADING':
			return {
				...state,
				isLoading: action.payload,
			}
		default:
			throw new Error('Invalid action type')
	}
}
