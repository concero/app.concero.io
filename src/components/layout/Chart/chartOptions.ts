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
      labelVisible: false,
      color: colors.grey.dark,
    },
  },
  autoSize: true,
  handleScroll: false,
  handleScale: false,
})

export const areaSeriesOptions = (colors, theme, lineNumber = null) => {
  const lineColor = lineNumber === 'secondLine' ? '#1B7BEA' : colors.primary.main
  // const topColor = lineNumber === 'secondLine' ? colors.primary.darker : colors.primary.darker
  const dark = theme === 'dark'

  return {
    baseLineVisible: false,
    lineType: 2,
    lineWidth: 1.8,
    strokeLinecap: 'round',
    topColor: colors.primary.darker,
    bottomColor: dark ? 'rgba(0, 0, 0, 0)' : 'rgba(255, 255, 255, 0)',
    baseLineStyle: 1,
    lineColor,
    priceFormat: {
      type: 'volume',
      priceScaleId: '',
    },
  }
}