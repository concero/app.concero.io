import React, { FC, useContext, useEffect, useRef } from 'react'
import { ColorType, createChart } from 'lightweight-charts'
import { ThemeContext } from '../../../hooks/themeContext.tsx'
// import { colors } from '../../../constants/colors'

export const data = [
  { time: '2018-12-22', value: 32.51 },
  { time: '2018-12-23', value: 31.11 },
  { time: '2018-12-24', value: 27.02 },
  { time: '2018-12-25', value: 27.32 },
  { time: '2018-12-26', value: 25.17 },
  { time: '2018-12-27', value: 28.89 },
  { time: '2018-12-28', value: 25.46 },
  { time: '2018-12-29', value: 23.92 },
  { time: '2018-12-30', value: 22.68 },
  { time: '2018-12-31', value: 22.67 },
  { time: '2019-01-01', value: 23.46 },
  { time: '2019-01-02', value: 24.16 },
  { time: '2019-01-03', value: 27.33 },
  { time: '2019-01-04', value: 27.77 },
  { time: '2019-01-05', value: 28.33 },
  { time: '2019-01-06', value: 28.96 },
  { time: '2019-01-07', value: 28.77 },
  { time: '2019-01-08', value: 29.77 },
  { time: '2019-01-09', value: 30.47 },
]

interface ChartProps {
  data: any
}

export const Chart: FC<ChartProps> = () => {
  const ref = useRef()
  const { colors } = useContext(ThemeContext)
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

    const handleResize = () => {
      chart.resize(ref.current.clientWidth, ref.current.clientHeight)
    }
    chart.timeScale().fitContent()
    chart.timeScale().applyOptions({
      borderColor: colors.base.background,
    })
    chart.priceScale('right').applyOptions({
      borderColor: colors.base.background,
    })
    const newSeries = chart.addAreaSeries(areaSeriesOptions)

    newSeries.setData(data)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [colors])

  return <div className="f1" ref={ref} />
}
