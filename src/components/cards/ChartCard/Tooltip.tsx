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

export function createTooltip(textColor: string) {
  const toolTip = document.createElement('div')
  toolTip.className = 'tooltipp'
  toolTip.style = `
    width: 96px;
    height: 80px;
    position: absolute;
    display: none;
    padding: 8px;
    box-sizing: border-box;
    font-size: 12px;
    text-align: left;
    z-index: 100;
    top: 12px;
    left: 12px;
    pointer-events: none;
    border-radius: 2px;
    color: ${textColor};
  `
  return toolTip
}

export function updateTooltip(param, newSeries, toolTip, chartElement) {
  if (!param.point || !param.time || isOutsideBounds(param.point, chartElement)) {
    toolTip.style.display = 'none'
    return
  }

  toolTip.style.display = 'block'
  const data = param.seriesData.get(newSeries)
  const price = data.value ?? data.close
  toolTip.innerHTML = `<div style="font-size: 18px; margin: 4px 0px;">${Math.round(100 * price) / 100}</div>`

  const coordinate = newSeries.priceToCoordinate(price)
  if (coordinate === null) return

  const shiftedCoordinate = getShiftedCoordinate(param.point.x, chartElement.clientWidth)
  const coordinateY = getCoordinateY(coordinate, chartElement.clientHeight)
  toolTip.style.left = `${shiftedCoordinate}px`
  toolTip.style.top = `${coordinateY}px`
}
