import { FC, useContext, useEffect, useRef, useState } from 'react'
import { createChart } from 'lightweight-charts'
import { ThemeContext } from '../../../hooks/themeContext'
import { getData } from '../../../api/chart/getData'
import { areaSeriesOptions, chartOptions } from './chartOptions'
import { createTooltip, updateTooltip } from './Tooltip'

interface Chain {
  name: string
  symbol: string
  id: string
}

interface Interval {
  title: string
  value: string
}

interface ChartProps {
  selectedChain: Chain
  selectedInterval: Interval
}

export const Chart: FC<ChartProps> = ({ selectedChain, selectedInterval }) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const seriesRef = useRef<any>(null)
  const { text: textColor } = useContext(ThemeContext).colors

  const [data, setData] = useState<any[]>([])

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      const response = await getData(selectedChain.id, 'usd', selectedInterval.value)
      setData(response)
    }
    fetchData()
  }, [selectedChain, selectedInterval])

  // Initialize chart
  useEffect(() => {
    if (!chartRef.current) return
    const chart = createChart(chartRef.current, chartOptions)

    seriesRef.current = chart.addAreaSeries(areaSeriesOptions)
    seriesRef.current.setData(data)
    tooltipRef.current = createTooltip(textColor)
    chartRef.current.appendChild(tooltipRef.current)

    const handleResize = () => {
      const { clientWidth, clientHeight } = chartRef.current
      chart.resize(clientWidth, clientHeight)
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
  }, [textColor])

  // Update chart data
  useEffect(() => {
    if (seriesRef.current) {
      seriesRef.current.setData(data)
    }
  }, [data])

  return <div className="f1" ref={chartRef} />
}
