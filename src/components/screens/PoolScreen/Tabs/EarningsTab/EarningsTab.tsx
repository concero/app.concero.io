import { UserActionsCard } from '../../../../cards/UserActionsCard/UserActionsCard'
import classNames from './EarningsTab.module.pcss'
import { EarningsCard } from '../../../../cards/EarningsCard/EarningsCard'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { calculateWithdrawableAmount, getLpTotalSupply, getUserLpTokens } from '../../../../../api/concero/poolLpTokens'
import { formatUnits, parseUnits } from 'viem'
import { getPoolLiquidity } from '../../../../../api/concero/getPoolLiquidity'

export const EarningsTab = () => {
	const { address } = useAccount()
	const [userBalance, setUserBalance] = useState(0)
	const [userBalanceUsdc, setUserBalanceUsdc] = useState(0)
	const [userPoolShare, setUserPoolShare] = useState(0)
	const [rate, setRate] = useState(0)

	const getTokens = async () => {
		const balanceLp = await getUserLpTokens(address!)
		setUserBalance(balanceLp)

		const totalSupply = await getLpTotalSupply()
		const poolLiquidity = await getPoolLiquidity()

		const ratio = totalSupply / poolLiquidity
		const lpDecimals = parseUnits(String(balanceLp), 18)
		const balanceUsdc = await calculateWithdrawableAmount(lpDecimals)
		const balancaUsdcFormated = Number(formatUnits(balanceUsdc, 6))

		const poolShare = (balancaUsdcFormated / poolLiquidity) * 100

		setUserPoolShare(poolShare)
		setUserBalanceUsdc(balancaUsdcFormated)
		setRate(ratio)
	}

	useEffect(() => {
		getTokens()
	}, [address])

	const statisticBlock = (
		<div className={classNames.statisticBlock}>
			<EarningsCard />
		</div>
	)

	return (
		<div className={classNames.earningsTab}>
			{statisticBlock}
			<UserActionsCard />
		</div>
	)
}
