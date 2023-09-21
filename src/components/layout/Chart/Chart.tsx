import React, { FC, useContext, useEffect, useRef } from 'react'
import { createChart } from 'lightweight-charts'
import { animated, useSpring } from '@react-spring/web'
import { ThemeContext } from '../../../hooks/themeContext'
import { areaSeriesOptions, chartOptions } from './chartOptions'
import { createTooltip, updateTooltip } from './Tooltip'

interface DataPoint {
  time: string
  value: number
}

interface ChartProps {
  data: DataPoint[]
  secondData?: DataPoint[] | null
}

const useFadeInAnimation = () => useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 },
    reset: true,
  })

const averageData = (data: DataPoint[], interval: number): DataPoint[] => {
  const result: DataPoint[] = []
  let sum = 0
  let count = 0

  for (let i = 0; i < data.length; i++) {
    sum += data[i].value
    count++

    if (count === interval || i === data.length - 1) {
      result.push({
        time: data[i].time,
        value: sum / count,
      })
      sum = 0
      count = 0
    }
  }

  return result
}

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
    chart.subscribeCrosshairMove((param) => {
      if (tooltipRef.current) updateTooltip(param, seriesRef.current, secondSeries, tooltipRef.current, chartRef.current, '$')
    })

    return () => {
      cleanupChart(chart, handleResize)
    }
  }, [colors, data])

  const setupChartStyles = (chart, colors) => {
    chart.timeScale().applyOptions({ borderColor: 'transparent' })
    chart.priceScale('right').applyOptions({
      borderColor: 'transparent',
      textColor: colors.text.secondary,
    })
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
