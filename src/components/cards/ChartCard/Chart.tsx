import { FC, useContext, useEffect, useRef, useState } from 'react'
import { createChart } from 'lightweight-charts'
import { ThemeContext } from '../../../hooks/themeContext'
import { areaSeriesOptions, chartOptions } from './chartOptions'
import { createTooltip, updateTooltip } from './Tooltip'
import { fetchChartData } from '../../../api/chart/fetchChartData'
import { NotificationsContext } from '../../../hooks/notificationsContext'
import { fetchTokenIdBySymbol } from '../../../api/chart/fetchTokenIdBySymbol'

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
  const [tokenId, setTokenId] = useState<string>(selectedToken.name.toLowerCase())
  const [data, setData] = useState<any[]>([])
  const { colors } = useContext(ThemeContext)

  const getTokenId = async (symbol: string) => {
    const id = await fetchTokenIdBySymbol(symbol)
    setTokenId(id)
  }

  // Fetch data
  useEffect(() => {
    fetchChartData(setData, addNotification, tokenId, selectedInterval)
    const interval = setInterval(() => {
      fetchChartData(setData, addNotification, tokenId, selectedInterval)
    }, 12000)

    return () => {
      clearInterval(interval)
    }
  }, [selectedInterval, tokenId])

  useEffect(() => {
    getTokenId(selectedToken.symbol, setTokenId)
  }, [selectedToken])

  // Initialize chart
  useEffect(() => {
    if (!chartRef.current) return

    const chart = createChart(chartRef.current, chartOptions(colors))
    chart.timeScale().fitContent()

    chart.timeScale().applyOptions({ borderColor: 'transparent' })
    chart.priceScale('right').applyOptions({ borderColor: 'transparent', textColor: colors.text.secondary })
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
