import axios from 'axios'

interface Item {
	time: number
	value: number
}

export const fetchChartData = async (
	setData: (data: Item[]) => void,
	addNotification,
	tokenId: string,
	interval: {
		value: string
	},
) => {
	const url = `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart?vs_currency=usd&days=${interval.value}`

	try {
		const response = await axios.get(url)
		const data = response.data.prices.map((item: [number, number]) => ({
			time: item[0] / 1000, // Divide by 1000 to convert to milliseconds
			value: item[1],
		}))

		setData(data)
	} catch (error) {
		addNotification({
			title: "Couldn't fetch CoinGecko data",
			message: error.message,
			color: 'red',
		})
	}
}
