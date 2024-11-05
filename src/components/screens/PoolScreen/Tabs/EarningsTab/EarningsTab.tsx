import { Card } from '../../../../cards/Card/Card'
import { ProjectedEarningsCard } from '../../../../cards/ProjectedEarningsCard/ProjectedEarningsCard'
import { UserActionsCard } from '../../../../cards/UserActionsCard/UserActionsCard'
import { ProgressBar } from '../../../../layout/progressBar/ProgressBar'
import classNames from './EarningsTab.module.pcss'
import { EarningsCard } from '../../../../cards/EarningsCard/EarningsCard'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { calculateWithdrawableAmount, getLpTotalSupply, getUserLpTokens } from '../../../../../api/concero/poolLpTokens'
import { formatUnits, parseUnits } from 'viem'
import { getPoolLiquidity } from '../../../../../api/concero/getPoolLiquidity'

interface UserBalance {
	userBalanceLp: number
	userBalanceUsdc: number
}

const PoolShareCard = ({ userPoolShare }: { userPoolShare: number }) => (
	<Card className={`${classNames.poolShare} cardConvex`}>
		<h4 className="body4">Your pool share</h4>
		<h2>{!isNaN(userPoolShare) ? userPoolShare.toFixed(1) : 'n/a'} %</h2>
		<ProgressBar percentage={userPoolShare} />
	</Card>
)

const UserLpCard = ({ userBalanceLp, userBalanceUsdc }: UserBalance) => {
	return (
		<Card className={`${classNames.userLp} f1 cardConvex`}>
			<p className="body4">Your LPs</p>
			<h3>{userBalanceUsdc.toFixed(1)} USDC</h3>
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
		const poolLiquidity = await getPoolLiquidity()

		// TODO: TS2365: Operator / cannot be applied to types number and number | bigint
		const ratio = totalSupply / poolLiquidity
		const lpDecimals = parseUnits(String(balanceLp), 18)
		const balanceUsdc = await calculateWithdrawableAmount(lpDecimals)
		const balanceUsdcFormated = Number(formatUnits(balanceUsdc, 6))

		// TODO: TS2365: Operator / cannot be applied to types number and number | bigint
		const poolShare = (balanceUsdcFormated / poolLiquidity) * 100

		setUserPoolShare(poolShare)
		setUserBalanceUsdc(balanceUsdcFormated)
		setRate(ratio)
	}

	useEffect(() => {
		// TODO: unhandled promise rejection!
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
