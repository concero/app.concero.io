import { fetchStakingChartData } from '../../../api/defilama/fetchStakingChartData'

export const fetchData = async ({ selectedVault, setResponse }) => {
  try {
    const response = await fetchStakingChartData(selectedVault.defiLlamaPoolId)
    setResponse(response)
  } catch (e) {
    console.log(e)
  }
}
