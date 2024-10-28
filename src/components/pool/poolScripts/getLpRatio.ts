import { getLpTotalSupply } from '../../../api/concero/pool/poolLpTokens'
import { fetchLastFee } from '../../../api/concero/pool/fetchFees'

export const getLpRatio = async () => {
	const totalSupply = await getLpTotalSupply()
	const { poolLiquidity } = await fetchLastFee()

	return totalSupply / poolLiquidity
}
