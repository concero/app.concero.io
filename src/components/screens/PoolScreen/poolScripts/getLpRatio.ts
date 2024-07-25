import { getLpTotalSupply } from '../../../../api/concero/poolLpTokens'
import { fetchLastFee } from '../../../../api/concero/fetchFees'

export const getLpRatio = async () => {
	const totalSupply = await getLpTotalSupply()
	const { poolLiquidity } = await fetchLastFee()

	return totalSupply / poolLiquidity
}
