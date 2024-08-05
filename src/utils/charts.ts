import { type ChartData } from '../types/utils'
import dayjs from 'dayjs'
import weekYear from 'dayjs/plugin/weekYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'

dayjs.extend(weekYear)
dayjs.extend(weekOfYear)

export const getUniqueChatData = (chartData: ChartData[]) => {
	const table: Record<number, 1> = {}

	return chartData.filter(({ time }) => !table[time] && (table[time] = 1))
}

const groupByDays = (data: ChartData[]) => {
	return data.reduce((acc: Record<string, ChartData>, item) => {
		const day = dayjs(item.time).format('YYYY-MM-DD')
		if (!acc[day]) {
			acc[day] = item
		}
		acc[day].value += item.value
		return acc
	}, {})
}

const groupByWeeks = (data: ChartData[]) => {
	return data.reduce((acc: Record<string, ChartData>, item) => {
		const week = dayjs(item.time).weekYear()
		const year = dayjs(item.time).year()
		const weekKey = `${year}-W${week}`
		if (!acc[weekKey]) {
			acc[weekKey] = item
		}
		acc[weekKey].value += item.value
		return acc
	}, {})
}

const convertGroupedToArray = (groupedData: Record<string, ChartData>, timeFormat: string) => {
	return Object.keys(groupedData).map(key => {
		const time = dayjs(key, timeFormat).valueOf()
		return {
			time,
			value: groupedData[key].value,
		}
	})
}

export const groupDataByDays = (data: ChartData[]) => {
	const groupedByDays = groupByDays(data)
	return convertGroupedToArray(groupedByDays, 'YYYY-MM-DD')
}

export const groupDataByWeeks = (data: ChartData[]) => {
	const groupedByWeeks = groupByWeeks(data)
	return convertGroupedToArray(groupedByWeeks, 'YYYY-[W]W')
}
