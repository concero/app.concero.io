import { FC, useContext, useEffect, useRef } from 'react'
import { createChart } from 'lightweight-charts'
import { ThemeContext } from '../../../hooks/themeContext'
import { areaSeriesOptions, chartOptions } from './chartOptions'
import { createTooltip, updateTooltip } from './Tooltip'

interface ChartProps {
  data: any[]
}

export const Chart: FC<ChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const seriesRef = useRef<any>(null)
  const { colors, theme } = useContext(ThemeContext)

  useEffect(() => {
    if (!chartRef.current) return

    const chart = createChart(chartRef.current, chartOptions(colors, theme))
    chart.timeScale().fitContent()

    chart.timeScale().applyOptions({ borderColor: 'transparent' })
    chart.priceScale('right').applyOptions({
      borderColor: 'transparent',
      textColor: colors.text.secondary,
    })
    seriesRef.current = chart.addAreaSeries(areaSeriesOptions(colors, theme))
    seriesRef.current.setData(data)
    tooltipRef.current = createTooltip()
    chartRef.current.appendChild(tooltipRef.current)

    const handleResize = () => {
      const { offsetWidth, offsetHeight } = chartRef.current
      chart.resize(offsetWidth, offsetHeight)
    }

    window.addEventListener('resize', handleResize)
    chart.subscribeCrosshairMove((param) => {
      if (tooltipRef.current) updateTooltip(param, seriesRef.current, tooltipRef.current, chartRef.current)
    })

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
      if (tooltipRef.current) {
        tooltipRef.current.remove()
        tooltipRef.current = null
      }
    }
  }, [colors, data, chartRef])

  return <div className="f1" ref={chartRef} />
}
