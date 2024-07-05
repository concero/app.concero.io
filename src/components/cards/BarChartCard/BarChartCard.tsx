import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { CardHeader } from '../CardHeader/CardHeader'
import { colors } from '../../../constants/colors'
import classNames from './BarChartCard.module.pcss'
import { Card } from '../Card/Card'

export interface ReChartsData {
	name: string
	amount: number
}

export interface BarChartProps {
	data: ReChartsData[]
}

export interface BarChartCardProps {
	titleCard: string
	data: ReChartsData[]
}

const CustomTooltip = ({ active, payload, label }) => {
	if (active && payload?.length) {
		return (
			<Card className="cardConvex">
				<p className="label">{`${label}: $${payload[0].value}`}</p>
			</Card>
		)
	}

	return null
}

export function RechartsBarChart({ data }: BarChartProps) {
	return (
		<ResponsiveContainer width="100%" height={200}>
			<BarChart width={150} height={80} data={data} barSize={18}>
				<Bar dataKey="amount" radius={[4, 4, 0, 0]}>
					{data.map((_, index) => (
						<Cell key={`cell-${index}`} fill={colors.primary.lighter} />
					))}
				</Bar>
				<Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
				<XAxis dataKey="name" axisLine={false} tickLine={false} />
			</BarChart>
		</ResponsiveContainer>
	)
}

export const BarChartCard = ({ titleCard = 'Untitled', data }: BarChartCardProps) => (
	<Card className={`${classNames.container} f1 cardConvex`}>
		<CardHeader title={titleCard} />
		<RechartsBarChart data={data} />
	</Card>
)
