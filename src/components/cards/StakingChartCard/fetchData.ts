import { fetchTvlApyChartData } from '../../../api/defilama/fetchTvlApy'

export const fetchData = async ({ selectedVault, setResponse }) => {
  const addresses = selectedVault.underlying_assets.map((asset) => asset.address)

  try {
    const response = await fetchTvlApyChartData(addresses)
    setResponse(response)
  } catch (e) {
    console.log(e)
  }
}
