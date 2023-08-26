import { fetchTvlApyChartData } from '../../../api/defilama/fetchTvlApy'

export const getChartData = async ({ selectedVault, setData }) => {
  const addresses = selectedVault.underlying_assets.map((asset) => asset.address)

  try {
    const response = await fetchTvlApyChartData(addresses)
    console.log(response)
    setData(response)
  } catch (e) {
    console.log(e)
  }
}
