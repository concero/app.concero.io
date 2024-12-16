import { ColorType } from 'lightweight-charts'
import { color } from '../../../../constants/json/colors-light.json'

export const chartOptions = {
	layout: {
		background: {
			type: ColorType.Solid,
			color: 'transparent',
		},
		textColor: color.text.secondary,
		fontFamily: 'DM_Sans',
	},
	localization: {
		locale: 'en-US',
		dateFormat: 'dd MMM',
	},
	grid: {
		vertLines: {
			color: color.background,
			style: 1,
			visible: false,
		},
		horzLines: {
			color: color.background,
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
			visible: false,
			labelVisible: false,
			color: color.grey.dark,
		},
		vertLine: {
			visible: false,
			labelVisible: false,
			color: color.grey.dark,
		},
	},
	autoSize: true,
	handleScroll: false,
	handleScale: false,
}

const lineNumber = null
const lineColor = lineNumber === 2 ? '#1B7BEA' : color.primary.main
// const topColor = lineNumber === 'secondLine' ? color.primary.darker : color.primary.darker

const getTopColor = () => {
	return color.primary.darker
}
const getBottomColor = () => {
	return 'rgba(255, 255, 255, 0)'
}

export const areaSeriesOptions = {
	baseLineVisible: false,
	lineType: 0,
	lineWidth: 1.8,
	strokeLinecap: 'round',
	topColor: getTopColor(),
	bottomColor: getBottomColor(),
	baseLineStyle: 1,
	lineColor,
	priceFormat: {
		type: 'volume',
		priceScaleId: '',
	},
	priceLineVisible: false,
}
