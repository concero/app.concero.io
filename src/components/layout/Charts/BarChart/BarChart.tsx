import { Bar, BarChart as ReBarChart, Cell, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { type ChartData } from '../../../../types/utils'
import dayjs from 'dayjs'
import classNames from '../Charts.module.pcss'

export interface BarChartProps {
	data: ChartData[]
	height?: number
}

const CustomTooltip = ({ active, payload, label }) => {
	if (active && payload?.length) {
		return (
			<div className={classNames.tooltip} style={{ display: 'flex' }}>
				<b>${payload[0].value}</b>
				<p>{label}</p>
			</div>
		)
	}

	return null
}

export function BarChart({ data, height = 200 }: BarChartProps) {
	const clearData = data.map(item => {
		return {
			value: Number(item.value.toFixed(2)),
			time: dayjs(item.time).format('DD MMM. YYYY'),
		}
	})

	return (
		<ResponsiveContainer width="100%" height={height}>
			<ReBarChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }} width={150} data={clearData}>
				<defs>
					<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
						<stop offset="60%" stopColor="#D9D6FE" stopOpacity={1} />
						<stop offset="100%" stopColor="#F4F3FF" stopOpacity={1} />
					</linearGradient>
				</defs>
				<Bar dataKey="value" radius={8} activeBar={{ fill: '#7A5AF8' }}>
					{clearData.map((_, index) => (
						<Cell key={`cell-${index}`} fill="url(#colorUv)" />
					))}
				</Bar>
				<Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
				<XAxis dataKey="time" axisLine={false} tickLine={false} padding="gap" />
			</ReBarChart>
		</ResponsiveContainer>
	)
}
