import { Card } from '../../../../cards/Card/Card'
import { ProjectedEarningsCard } from '../../../../cards/ProjectedEarningsCard/ProjectedEarningsCard'
import { UserActionsCard } from '../../../../cards/UserActionsCard/UserActionsCard'
import { ProgressBar } from '../../../../layout/progressBar/ProgressBar'
import classNames from './EarningsTab.module.pcss'
import { EarningsCard } from '../../../../cards/EarningsCard/EarningsCard'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { calculateWithdrawableAmount, getLpTotalSupply, getUserLpTokens } from '../../../../../api/concero/poolLpTokens'
import { fetchLastFee } from '../../../../../api/concero/fetchFees'
import { formatUnits, parseUnits } from 'viem'

interface UserBalance {
	userBalanceLp: number
	userBalanceUsdc: number
}

const PoolShareCard = ({ userPoolShare }: { userPoolShare: number }) => (
	<Card className={`${classNames.poolShare} cardConvex`}>
		<h4 className="body4">Your pool share</h4>
		<h2>{userPoolShare.toFixed(1)} %</h2>
		<ProgressBar percentage={userPoolShare} />
	</Card>
)

const UserLpCard = ({ userBalanceLp, userBalanceUsdc }: UserBalance) => {
	return (
		<Card className={`${classNames.userLp} f1 cardConvex`}>
			<p className="body4">Your LPs</p>
			<h2>{userBalanceUsdc.toFixed(2)} USDC</h2>
			<h4>{userBalanceLp.toFixed(2)} CLP-USDC</h4>
		</Card>
	)
}

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
		const { poolLiquidity } = await fetchLastFee()

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
			<div className={classNames.statisticLeftSide}>
				<div className={classNames.userValue}>
					<PoolShareCard userPoolShare={userPoolShare} />
					<UserLpCard userBalanceLp={userBalance} userBalanceUsdc={userBalanceUsdc} />
				</div>
				<ProjectedEarningsCard rate={rate} deposit={userBalanceUsdc} />
			</div>
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
