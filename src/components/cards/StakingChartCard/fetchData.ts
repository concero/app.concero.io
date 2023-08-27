import { fetchStakingChartData } from '../../../api/defilama/fetchStakingChartData'

export const fetchData = async ({ selectedVault, setResponse }) => {
  const addresses = selectedVault.underlying_assets.map((asset) => asset.address)

  try {
    const response = await fetchStakingChartData(addresses)
    setResponse(response)
  } catch (e) {
    console.log(e)
  }
}
