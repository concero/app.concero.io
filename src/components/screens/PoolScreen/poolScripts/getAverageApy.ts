export const mockDataForWeek = [
	{
		value: 30, // 0.01 * value
		time: new Date('2024-06-23').getTime(),
	},
	{
		value: 40, // 0.01 * value
		time: new Date('2024-06-24').getTime(),
	},
	{
		value: 2,
		time: new Date('2024-06-25').getTime(),
	},
	{
		value: 12,
		time: new Date('2024-06-26').getTime(),
	},
	{
		value: 23,
		time: new Date('2024-06-27').getTime(),
	},
	{
		value: 18,
		time: new Date('2024-06-28').getTime(),
	},
	{
		value: 6,
		time: new Date('2024-06-29').getTime(),
	},
	{
		value: 15,
		time: new Date('2024-06-30').getTime(),
	},
]

const mockCap = 1000

export const getAverageApy = (data = mockDataForWeek) => {
	const result = data.map(item => {
		const apr = (item.value / mockCap) * 100
		const apy = (1 + apr / 12) ** (12 * 1) - 1

		return { value: Math.floor(apy), time: item.time }
	})

	return result
}
