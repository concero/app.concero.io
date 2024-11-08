import { type FC, useContext, useEffect, useRef } from 'react'
import { createChart, type IChartApi } from 'lightweight-charts'
import { animated, useSpring } from '@react-spring/web'
import { ThemeContext } from '../../../../hooks/themeContext'
import { areaSeriesOptions, chartOptions } from './chartOptions'
import { createTooltip, updateTooltip } from './Tooltip'
import { type ChartData } from '../../../../types/utils'
import dayjs from 'dayjs'

interface ChartProps {
	data: ChartData[]
}

const useFadeInAnimation = () =>
	useSpring({
		from: { opacity: 0 },
		to: { opacity: 1 },
		config: { duration: 300 },
		reset: true,
	})

export const Chart: FC<ChartProps> = ({ data }) => {
	const chartRef = useRef<HTMLDivElement>(null)
	const tooltipRef = useRef<HTMLDivElement | null>(null)
	const seriesRef = useRef<any>(null)
	const { colors, theme } = useContext(ThemeContext)
	const fadeProps = useFadeInAnimation()

	const clearData = data.map(item => {
		return {
			value: Number(item.value.toFixed(2)),
			time: dayjs(item.time).format('YYYY-MM-DD'),
		}
	})

	useEffect(() => {
		if (!chartRef.current) return
		const chart = createChart(chartRef.current, chartOptions(colors))

		setupChartStyles(chart)

		seriesRef.current = chart.addAreaSeries(areaSeriesOptions(colors, theme))
		seriesRef.current.setData(clearData)
		tooltipRef.current = createTooltip()
		chartRef.current.appendChild(tooltipRef.current)
		chart.timeScale().fitContent()

		const handleResize = () => {
			const { clientWidth, clientHeight } = chartRef.current!
			chart.resize(clientWidth, clientHeight)

			chart.timeScale().fitContent()
		}
		window.addEventListener('resize', handleResize)
		chart.subscribeCrosshairMove(param => {
			if (tooltipRef.current) updateTooltip(param, seriesRef.current, tooltipRef.current, chartRef.current, '$')
		})

		return () => {
			cleanupChart(chart, handleResize)
		}
	}, [colors, clearData])

	const setupChartStyles = (chart: IChartApi) => {
		chart.timeScale().applyOptions({ visible: true, borderColor: 'transparent' })
		chart.priceScale('right').applyOptions({ visible: false })
	}

	const cleanupChart = (chart, handleResize) => {
		window.removeEventListener('resize', handleResize)
		chart.remove()
		if (tooltipRef.current) {
			tooltipRef.current.remove()
			tooltipRef.current = null
		}
	}

	return <animated.div className="f1" ref={chartRef} style={fadeProps} />
}
