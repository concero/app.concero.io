import { timestampToLocalTime } from '../../../utils/formatting'
import { ChartType } from './constants'

const standardizeItem = (item, type) => {
	if (!item[type]) return null
	return {
		time: timestampToLocalTime(Date.parse(item.timestamp) / 1000),
		value: item[type],
	}
}

const getType = chartType => {
	switch (chartType) {
		case ChartType.TVLAPY:
			return {
				main: 'tvlUsd',
				secondary: 'apy',
			}
		case ChartType.SUPPLYAPY:
			return {
				main: 'apyBase',
				secondary: 'apyReward',
			}
		case ChartType.SUPPLY7D:
			return {
				main: 'apyBase7d',
				secondary: null,
			}
		default:
			throw new Error('Invalid chart type')
	}
}

export const switchChartType = ({ response, chartType, setData }) => {
	if (!response) return
	const type = getType(chartType)
	const main = response.data.data.reduce((acc, item) => {
		const standardized = standardizeItem(item, type.main)
		if (standardized) acc.push(standardized)
		return acc
	}, [])
	const secondary = type.secondary
		? response.data.data.reduce((acc, item) => {
				const standardized = standardizeItem(item, type.secondary)
				if (standardized) acc.push(standardized)
				return acc
		  }, [])
		: null

	setData({
		main,
		secondary,
	})
}
