import { type FC, useContext, useEffect, useRef } from 'react'
import { createChart, type IChartApi } from 'lightweight-charts'
import { animated, useSpring } from '@react-spring/web'
import { ThemeContext } from '../../../hooks/themeContext'
import { areaSeriesOptions, chartOptions } from './chartOptions'
import { createTooltip, updateTooltip } from './Tooltip'
import { type ChartData } from '../../../types/utils'

interface ChartProps {
	data: ChartData[]
	secondData?: ChartData[] | null
}

const useFadeInAnimation = () =>
	useSpring({
		from: { opacity: 0 },
		to: { opacity: 1 },
		config: { duration: 300 },
		reset: true,
	})

export const Chart: FC<ChartProps> = ({ data, secondData = null }) => {
	const chartRef = useRef<HTMLDivElement>(null)
	const tooltipRef = useRef<HTMLDivElement | null>(null)
	const seriesRef = useRef<any>(null)
	const { colors, theme } = useContext(ThemeContext)
	const fadeProps = useFadeInAnimation()

	useEffect(() => {
		if (!chartRef.current) return
		const chart = createChart(chartRef.current, chartOptions(colors))
		setupChartStyles(chart, colors)

		seriesRef.current = chart.addAreaSeries(areaSeriesOptions(colors, theme))
		seriesRef.current.setData(data)
		const secondSeries = addSecondSeries(chart, secondData, colors, theme)
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
			if (tooltipRef.current)
				updateTooltip(param, seriesRef.current, secondSeries, tooltipRef.current, chartRef.current, '$')
		})

		return () => {
			cleanupChart(chart, handleResize)
		}
	}, [colors, data])

	const setupChartStyles = (chart: IChartApi) => {
		chart.timeScale().applyOptions({ visible: false })
		chart.priceScale('right').applyOptions({ visible: false })
	}

	const addSecondSeries = (chart, secondData, colors, theme) => {
		let secondSeries = null
		if (secondData) {
			secondSeries = chart.addAreaSeries({
				priceScaleId: 'secondPriceScale',
				...areaSeriesOptions(colors, theme, 2),
			})
			secondSeries.setData(secondData)
		}
		return secondSeries
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
