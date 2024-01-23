import { formatNumber, unixTimeFormat } from '../../../utils/formatting'
import classNames from '../../cards/ChartCard/ChartCard.module.pcss'

function isOutsideBounds(point, chartElement) {
	return point.x < 0 || point.x > chartElement.clientWidth || point.y < 0 || point.y > chartElement.clientHeight
}

function getShiftedCoordinate(coordinate, maxCoordinate) {
	const shiftedCoordinate = coordinate - 50
	return Math.max(0, Math.min(maxCoordinate - 80, shiftedCoordinate))
}

function getCoordinateY(coordinate, maxCoordinate, tooltipHeight) {
	const tooltipOffset = 60
	if (coordinate + tooltipOffset + tooltipHeight > maxCoordinate) {
		return coordinate - tooltipOffset - tooltipHeight
	}
	return Math.max(0, coordinate - tooltipOffset)
}

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

export function updateTooltip(param, mainSeries, secondarySeries, toolTip, chartElement) {
	if (!param.point || !param.time || isOutsideBounds(param.point, chartElement)) {
		toolTip.style.opacity = 0
		return
	}

	const mainData = param.seriesData.get(mainSeries)
	const mainPrice = mainData?.value ?? mainData?.close
	if (mainPrice === undefined || mainPrice === null) return

	let content = ''

	if (secondarySeries) {
		const secondaryData = param.seriesData.get(secondarySeries)
		const secondaryPrice = secondaryData?.value ?? secondaryData?.close
		if (secondaryPrice !== undefined && secondaryPrice !== null) {
			content += `
        <div style='font-size: 0.875rem; font-weight: 400; color: var(--color-text-primary);'>
          <span style='font-weight: 500; color: var(--color-grey-400);'>${formatNumber(secondaryPrice)}%</span>
    </div>
      `
		}
	}

	content += `
    <div style='font-size: 0.875rem; font-weight: 400; color: var(--color-text-primary);'>
      <span style='font-weight: 500; color: var(--color-grey-400);'>$${formatNumber(mainPrice)}</span>
    </div>
  `

	content += `
  <span style='font-size: 0.875rem; font-weight: 400; color: var(--color-grey-500);'>${unixTimeFormat(
			param.time,
			'MMM DD, hh:mm',
		)}</span>
  `

	toolTip.style.opacity = 1
	toolTip.innerHTML = content

	const coordinate = mainSeries.priceToCoordinate(mainPrice)
	if (coordinate === null) return

	const tooltipHeight = toolTip.clientHeight

	const shiftedCoordinate = getShiftedCoordinate(param.point.x, chartElement.clientWidth)
	const coordinateY = getCoordinateY(coordinate, chartElement.clientHeight, tooltipHeight)
	toolTip.style.left = `${shiftedCoordinate}px`
	toolTip.style.top = `${coordinateY}px`
}
