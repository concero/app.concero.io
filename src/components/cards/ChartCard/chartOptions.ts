import { ColorType } from 'lightweight-charts'
import { colors } from '../../../constants/colors'

export const chartOptions = {
  layout: {
    background: { type: ColorType.Solid, color: colors.base.background },
    textColor: colors.text.primary,
    fontFamily: 'Poppins',
  },
  grid: {
    vertLines: { color: colors.grey.darker, style: 1, visible: true },
    horzLines: { color: colors.grey.darker, style: 1, visible: true },
  },
  timeScale: { timeVisible: true, secondsVisible: true },
  crosshair: {
    horzLine: { visible: true, labelVisible: false, color: colors.grey.dark },
    vertLine: { visible: true, labelVisible: true, color: colors.grey.dark },
  },
  handleScroll: false,
  handleScale: false,
}

export const areaSeriesOptions = {
  baseLineColor: colors.grey.light,
  baseLineVisible: false,
  lineType: 2,
  topColor: colors.primary.dark,
  bottomColor: colors.base.background,
  baseLineStyle: 1,
  lineColor: colors.primary.main,
}
