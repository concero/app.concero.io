import { formatTime, toLocaleNumber } from '../../../../utils/formatting'
import classNames from '../Charts.module.pcss'

export function createTooltip() {
	const toolTip = document.createElement('div')
	toolTip.className = classNames.tooltip
	toolTip.style = `
    	position: absolute;
    	left: 12px;
    	z-index: 10;
    	opacity: 1;
  	`
	return toolTip
}

const toolTipWidth = 150
const toolTipHeight = 20
const toolTipMargin = 15

export function updateTooltip(param, mainSeries, toolTip, chartElement) {
	if (
		param.point === undefined ||
		!param.time ||
		param.point.x < 0 ||
		param.point.x > chartElement.clientWidth ||
		param.point.y < 0 ||
		param.point.y > chartElement.clientHeight
	) {
		toolTip.style.display = 'none'
	} else {
		toolTip.style.display = 'flex'
		const data = param.seriesData.get(mainSeries)
		const price = data.value !== undefined ? data.value : data.close

		let content = ''

		content += `<b>${toLocaleNumber(price)}</b>`
		content += `<p style='font-size: 0.875rem; font-weight: 400; color: var(--color-grey-500);'>${formatTime(
			param.time,
			'DD MMM. YYYY',
		)}</p>`

		toolTip.style.opacity = 1
		toolTip.innerHTML = content

		const y = param.point.y
		let left = param.point.x
		if (left > chartElement.clientWidth - toolTipWidth) {
			left = param.point.x - toolTipMargin - toolTipWidth
		}

		let top = y
		if (top > chartElement.clientHeight - toolTipHeight) {
			top = y - toolTipMargin
		}
		toolTip.style.left = left + 'px'
	}
}
