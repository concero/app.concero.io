export function isOutsideBounds(point, chartElement) {
  return point.x < 0 || point.x > chartElement.clientWidth || point.y < 0 || point.y > chartElement.clientHeight
}

export function getShiftedCoordinate(coordinate, maxCoordinate) {
  const shiftedCoordinate = coordinate - 50
  return Math.max(0, Math.min(maxCoordinate - 80, shiftedCoordinate))
}

export function getCoordinateY(coordinate, maxCoordinate) {
  return coordinate + 80 > maxCoordinate ? coordinate - 80 : Math.max(0, Math.min(maxCoordinate - 80, coordinate))
}

export function createTooltip() {
  const toolTip = document.createElement('div')
  toolTip.className = 'chart-tooltip'
  toolTip.style = `
    position: absolute;
    opacity: 0;
    padding: 8px 12px;
    box-sizing: border-box;
    font-size: 12px;
    text-align: left;
    z-index: 100;
    top: 12px;
    left: 12px;
    pointer-events: none;
    border-radius: var(--st-br-md);
    background-color: var(--color-base-background);
    box-shadow: var(--st-sh-sm);
    border: 1px solid var(--color-grey-darker);
    transition: opacity 0.2s ease-in-out;
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
  const price = data.value ?? data.close
  toolTip.innerHTML = `<div style="font-size: 0.875rem; font-weight: 400; color: var(--color-text-primary);">$${
    Math.round(100 * price) / 100
  }</div>`

  const coordinate = newSeries.priceToCoordinate(price)
  if (coordinate === null) return

  const shiftedCoordinate = getShiftedCoordinate(param.point.x, chartElement.clientWidth)
  const coordinateY = getCoordinateY(coordinate, chartElement.clientHeight)
  toolTip.style.left = `${shiftedCoordinate}px`
  toolTip.style.top = `${coordinateY}px`
}
