import { FC, useContext, useEffect, useRef, useState } from 'react'
import { createChart } from 'lightweight-charts'
import { ThemeContext } from '../../../hooks/themeContext'
import { areaSeriesOptions, chartOptions } from './chartOptions'
import { createTooltip, updateTooltip } from './Tooltip'
import { getData } from '../../../api/chart/getData'

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
  const { colors } = useContext(ThemeContext)

  const [data, setData] = useState<any[]>([])

  const fetchData = async () => {
    const isCropNeeded = selectedInterval.value === 'max'
    const response = await getData(selectedChain.name, 'usd', selectedInterval.value, isCropNeeded)
    setData(response)
  }

  // Fetch data
  useEffect(() => {
    fetchData()

    const interval = setInterval(() => {
      fetchData()
    }, 60000)

    return () => {
      clearInterval(interval)
    }
  }, [selectedChain, selectedInterval])

  // Initialize chart
  useEffect(() => {
    if (!chartRef.current) return

    const chart = createChart(chartRef.current, chartOptions(colors))
    chart.timeScale().fitContent()
    chart.timeScale().applyOptions({ borderColor: 'transparent' })
    chart.priceScale('right').applyOptions({ borderColor: 'transparent' })

    seriesRef.current = chart.addAreaSeries(areaSeriesOptions(colors))
    seriesRef.current.setData(data)
    tooltipRef.current = createTooltip()
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
  }, [colors, data])

  // Update chart data
  useEffect(() => {
    if (seriesRef.current) {
      seriesRef.current.setData(data)
    }
  }, [data])

  return <div className="f1" ref={chartRef} />
}
