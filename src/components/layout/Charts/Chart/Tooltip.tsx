import { formatNumber, formatTime } from '../../../../utils/formatting'
import classNames from '../Charts.module.pcss'

export function createTooltip() {
	const toolTip = document.createElement('div')
	toolTip.className = classNames.tooltip
	toolTip.style = `
    	position: absolute;
    	top: 12px;
    	left: 12px;
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

		content += `<b>${formatNumber(price)}</b>`
		content += `<p style='font-size: 0.875rem; font-weight: 400; color: var(--color-grey-500);'>${formatTime(
			param.time,
			'DD MMM. YYYY',
		)}</p>`

		toolTip.style.opacity = 1
		toolTip.innerHTML = content

		const y = param.point.y
		let left = param.point.x + toolTipMargin
		if (left > chartElement.clientWidth - toolTipWidth) {
			left = param.point.x - toolTipMargin - toolTipWidth
		}

		let top = y + toolTipMargin
		if (top > chartElement.clientHeight - toolTipHeight) {
			top = y - toolTipHeight - toolTipMargin
		}
		toolTip.style.left = left + 'px'
		toolTip.style.top = top + 'px'
	}
}
