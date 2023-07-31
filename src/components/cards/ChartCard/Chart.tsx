import { FC, useContext, useEffect, useRef, useState } from 'react'
import { createChart } from 'lightweight-charts'
import { ThemeContext } from '../../../hooks/themeContext'
import { areaSeriesOptions, chartOptions } from './chartOptions'
import { createTooltip, updateTooltip } from './Tooltip'
import { fetchChartData } from '../../../api/coinGecko/fetchChartData'
import { NotificationsContext } from '../../../hooks/notificationsContext'
import { getCoingeckoTokenIdBySymbol } from '../../../api/coinGecko/getCoingeckoTokenIdBySymbol'

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
  selectedToken: Chain
  selectedInterval: Interval
}

export const Chart: FC<ChartProps> = ({ selectedToken, selectedInterval }) => {
  const { addNotification } = useContext(NotificationsContext)

  const chartRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const seriesRef = useRef<any>(null)
  const [data, setData] = useState<any[]>([])
  const { colors } = useContext(ThemeContext)

  // Fetch data
  useEffect(() => {
    const tokenId = getCoingeckoTokenIdBySymbol(selectedToken.symbol)
    fetchChartData(setData, addNotification, tokenId, selectedInterval)

    const interval = setInterval(() => {
      fetchChartData(setData, addNotification, tokenId, selectedInterval)
    }, 12000)

    return () => {
      clearInterval(interval)
    }
  }, [selectedInterval, selectedToken])

  // Initialize coinGecko
  useEffect(() => {
    if (!chartRef.current) return

    const chart = createChart(chartRef.current, chartOptions(colors))
    chart.timeScale().fitContent()

    chart.timeScale().applyOptions({ borderColor: 'transparent' })
    chart.priceScale('right').applyOptions({
      borderColor: 'transparent',
      textColor: colors.text.secondary,
    })
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
  }, [colors, data, chartRef])

  // Update coinGecko data
  useEffect(() => {
    if (seriesRef.current) {
      seriesRef.current.setData(data)
    }
  }, [data])

  return <div className="f1" ref={chartRef} />
}
