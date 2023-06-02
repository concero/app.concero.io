import { FC } from 'react'
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { CardHeader } from '../CardHeader/CardHeader'
import { colors } from '../../../constants/colors'
import classNames from './BarChartCard.module.pcss'

export interface BarChartCardProps {}

// export function PlotlyChart() {
//   const data = [
//     {
//       x: ['giraffes', 'orangutans', 'monkeys'],
//       y: [20, 14, 23],
//       type: 'bar',
//       marker: {
//         // styles for the bars
//         color: 'primary', // change to your primary color code
//         line: {
//           width: 1,
//         },
//       },
//     },
//   ]
//
//   const layout = {
//     autosize: false,
//     margin: {
//       l: 50,
//       r: 50,
//       b: 100,
//       t: 100,
//       pad: 4,
//     },
//     paper_bgcolor: 'colors.base.background', // change to your colors.base.background color code
//     plot_bgcolor: 'colors.base.background', // change to your colors.base.background color code
//   }
//
//   const config = { displayModeBar: false } // this is to remove the hover toolbar
//
//   return <Plot data={data} layout={layout} config={config} />
// }

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
