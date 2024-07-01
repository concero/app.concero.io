import { Bar, BarChart, Cell, ResponsiveContainer, XAxis } from 'recharts'
import { CardHeader } from '../CardHeader/CardHeader'
import { colors } from '../../../constants/colors'
import classNames from './BarChartCard.module.pcss'
import { Card } from '../Card/Card'

const data = [
	{
		name: 'ETH',
		amount: 15,
	},
	{
		name: 'OPT',
		amount: 20,
	},
	{
		name: 'ARB',
		amount: 40,
	},
	{
		name: 'USDT',
		amount: 30,
	},
	{
		name: 'OPT',
		amount: 20,
	},
	{
		name: 'ARB',
		amount: 40,
	},
	{
		name: 'MATIC',
		amount: 10,
	},
]

export interface BarChartCardProps {
	titleCard: string
}

export function RechartsBarChart() {
	return (
		<ResponsiveContainer width="100%" height={200}>
			<BarChart width={150} height={80} data={data} barSize={18}>
				<Bar dataKey="amount" radius={[4, 4, 0, 0]}>
					{data.map((_, index) => (
						<Cell key={`cell-${index}`} fill={colors.primary.lighter} />
					))}
				</Bar>
				<XAxis dataKey="name" axisLine={false} tickLine={false} />
			</BarChart>
		</ResponsiveContainer>
	)
}

export const BarChartCard = ({ titleCard = 'Top holdings' }: BarChartCardProps) => (
	<Card className={`${classNames.container} f1 cardConvex`}>
		<CardHeader title={titleCard} />
		<RechartsBarChart />
	</Card>
)
