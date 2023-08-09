import { ColorType } from 'lightweight-charts'

export const chartOptions = (colors) => ({
  layout: {
    background: {
      type: ColorType.Solid,
      color: 'transparent',
    },
    textColor: colors.text.secondary,
    fontFamily: 'Poppins',
  },
  grid: {
    vertLines: {
      color: colors.grey.darker,
      style: 1,
      visible: false,
    },
    horzLines: {
      color: colors.grey.darker,
      style: 1,
      visible: false,
    },
  },
  timeScale: {
    timeVisible: true,
    secondsVisible: true,
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
  autoSize: true,
  handleScroll: false,
  handleScale: false,
})

export const areaSeriesOptions = (colors) => ({
  baseLineColor: colors.grey.light,
  baseLineVisible: false,
  lineType: 2,
  topColor: colors.primary.dark,
  bottomColor: 'transparent',
  baseLineStyle: 1,
  lineColor: colors.primary.main,
})
