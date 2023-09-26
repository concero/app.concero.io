import { ChartType } from '../constants'

export const initialState = {
	data: {
		main: [],
		secondary: [],
	},
	chartType: ChartType.TVLAPY,
	response: null,
	isTypeModalVisible: false,
	isLoading: false,
}
