import { fetchChartData } from '../../../api/chart/fetchChartData'
import { fetchTokenIdBySymbol } from '../../../api/chart/fetchTokenIdBySymbol'

export const getTokenId = async (symbol: string, setTokenId) => {
  const id = await fetchTokenIdBySymbol(symbol)
  setTokenId(id)
}

export const getData = async (setData, selectedInterval, tokenId) => {
  const isCropNeeded = selectedInterval.value === 'max'
  const response = await fetchChartData(tokenId, 'usd', selectedInterval.value, isCropNeeded)
  setData(response)
}
