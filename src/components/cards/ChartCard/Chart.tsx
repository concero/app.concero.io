import { FC, useContext, useEffect, useRef, useState } from 'react'
import { ColorType, createChart } from 'lightweight-charts'
import { ThemeContext } from '../../../hooks/themeContext'
import { getData } from '../../../api/chart/getData'

interface ChartProps {
  selectedChain: {
    name: string
    symbol: string
  }
}

export const Chart: FC<ChartProps> = ({ selectedChain }) => {
  const ref = useRef()
  const { colors } = useContext(ThemeContext)
  const [data, setData] = useState([])
  const [dayes, setDayes] = useState('2')

  const fetchData = async () => {
    const response = await getData(selectedChain.id, 'usd', dayes)
    setData(response)
  }

  useEffect(() => {
    fetchData()
  }, [selectedChain])

  useEffect(() => {
    const chartOptions = {
      layout: {
        background: { type: ColorType.Solid, color: colors.base.background },
        textColor: colors.text.primary,
        fontFamily: 'Poppins',
      },
      grid: {
        vertLines: {
          color: colors.grey.darker,
          style: 1,
          visible: true,
        },
        horzLines: {
          color: colors.grey.darker,
          style: 1,
          visible: true,
        },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        horzLine: {
          visible: true,
          labelVisible: false,
          color: colors.grey.dark,
        },
        vertLine: {
          visible: true,
          labelVisible: true,
          color: colors.grey.dark,
        },
      },
    }

    const areaSeriesOptions = {
      baseLineColor: colors.grey.light,
      baseLineVisible: false,
      lineType: 2,
      topColor: colors.primary.dark,
      bottomColor: colors.base.background,
      baseLineStyle: 1,
      lineColor: colors.primary.main,
    }

    const chart = createChart(ref.current, chartOptions)
    // Setting the border color for the horizontal axis

    chart.timeScale().fitContent()
    chart.timeScale().applyOptions({
      borderColor: colors.base.background,
    })
    chart.priceScale('right').applyOptions({
      borderColor: colors.base.background,
    })

    const newSeries = chart.addAreaSeries(areaSeriesOptions)
    newSeries.setData(data)

    const handleResize = () => {
      chart.resize(ref.current.clientWidth, ref.current.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [colors, data])

  return <div className="f1" ref={ref} />
}
