import { numberToFormatString, unixTimeFormat } from '../../../utils/formatting'
import classNames from '../../cards/ChartCard/ChartCard.module.pcss'

function isOutsideBounds(point, chartElement) {
  return point.x < 0 || point.x > chartElement.clientWidth || point.y < 0 || point.y > chartElement.clientHeight
}

function getShiftedCoordinate(coordinate, maxCoordinate) {
  const shiftedCoordinate = coordinate - 50
  return Math.max(0, Math.min(maxCoordinate - 80, shiftedCoordinate))
}

function getCoordinateY(coordinate, maxCoordinate, tooltipHeight) {
  const tooltipOffset = 40
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

export function updateTooltip(param, newSeries, toolTip, chartElement) {
  if (!param.point || !param.time || isOutsideBounds(param.point, chartElement)) {
    toolTip.style.opacity = 0
    return
  }

  toolTip.style.opacity = 1
  const data = param.seriesData.get(newSeries)
  const price = data?.value ?? data?.close
  toolTip.innerHTML = `
<div style="font-size: 0.875rem; font-weight: 400; color: var(--color-text-primary);">
<span style="font-weight: 500; color: var(--color-grey-light);">$${numberToFormatString(price, 5)}</span>
<span style="font-weight: 400; color: var(--color-grey-medium);">${unixTimeFormat(param.time, 'MMM DD, hh:mm')}</span>
</div>`

  const coordinate = newSeries.priceToCoordinate(price)
  if (coordinate === null) return

  const tooltipHeight = toolTip.clientHeight

  const shiftedCoordinate = getShiftedCoordinate(param.point.x, chartElement.clientWidth)
  const coordinateY = getCoordinateY(coordinate, chartElement.clientHeight, tooltipHeight)
  toolTip.style.left = `${shiftedCoordinate}px`
  toolTip.style.top = `${coordinateY}px`
}
