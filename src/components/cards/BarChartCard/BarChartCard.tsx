import { type FC } from 'react'
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { CardHeader } from '../CardHeader/CardHeader'
import { colors } from '../../../constants/colors'
import classNames from './BarChartCard.module.pcss'

export interface BarChartCardProps {}

export function RechartsBarChart() {
	const data = [
		{
			name: 'BTC',
			amount: 15,
		},
		{
			name: 'ETH',
			amount: 20,
		},
		{
			name: 'ADA',
			amount: 30,
		},
		{
			name: 'DOT',
			amount: 40,
		},
		{
			name: 'LINK',
			amount: 10,
		},
		{
			name: 'XRP',
			amount: 60,
		},
		{
			name: 'LTC',
			amount: 12,
		},
		{
			name: 'BCH',
			amount: 40,
		},
		{
			name: 'Other',
			amount: 20,
		},
	]
	const barColors = [
		colors.green.dark,
		colors.primary.mainLight,
		colors.grey.medium,
		colors.green.dark,
		colors.primary.mainLight,
		colors.grey.medium,
		colors.green.dark,
		colors.primary.mainLight,
		colors.grey.medium,
	]

	return (
		<ResponsiveContainer width="100%" height={200} className={classNames.chartContainer}>
			<BarChart width={150} height={80} data={data} barSize={24}>
				<Bar dataKey="amount" radius={[5, 5, 5, 5]}>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={barColors[index]} />
					))}
				</Bar>
				<XAxis dataKey="name" axisLine={false} tickLine={false} />
				<YAxis axisLine={false} tickLine={false} />
			</BarChart>
		</ResponsiveContainer>
	)
}

export const BarChartCard: FC<BarChartCardProps> = () => (
	<div className={`card f1 ${classNames.container}`}>
		<CardHeader title="Top Holdings" />
		<RechartsBarChart />
	</div>
)
