import { Card } from '../../../../cards/Card/Card'
import { ProjectedEarningsCard } from '../../../../cards/ProjectedEarningsCard/ProjectedEarningsCard'
import { UserActionsCard, type UserTransaction } from '../../../../cards/UserActionsCard/UserActionsCard'
import { ProgressBar } from '../../../../layout/progressBar/ProgressBar'
import classNames from './EarningsTab.module.pcss'
import { EarningsCard } from '../../../../cards/EarningsCard/EarningsCard'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { getLpTotalSupply, getUserLpTokens } from '../../../../../api/concero/poolLpTokens'
import { fetchLastFee } from '../../../../../api/concero/fetchFees'

interface UserBalance {
	userBalanceLp: number
	userBalanceUsdc: number
}

const userActions: UserTransaction[] = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(item => {
	return {
		id: String(item) + Math.random().toString(),
		name: 'Withdrawal Complete',
		date: 'Today, 12:50',
		value: String(Math.floor(Math.random() * 10000)),
		status: item % 2 === 0 ? 'Available' : null,
	}
})

const PoolShareCard = ({ userPoolShare }: { userPoolShare: number }) => (
	<Card className={`${classNames.poolShare} cardConvex`}>
		<h4 className="body4">Your pool share</h4>
		<h2>{userPoolShare.toFixed(1)} %</h2>
		<ProgressBar percentage={userPoolShare} width={137} />
	</Card>
)

const UserLpCard = ({ userBalanceLp, userBalanceUsdc }: UserBalance) => {
	return (
		<Card className={`${classNames.userLp} f1 cardConvex`}>
			<p className="body4">Your LPs</p>
			<h2>{userBalanceUsdc.toFixed(2)} USDC</h2>
			<h4>{userBalanceLp.toFixed(2)} LPt</h4>
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
		const balanceUsdc = ratio * balanceLp
		const poolShare = (balanceUsdc / poolLiquidity) * 100

		setUserPoolShare(poolShare)
		setUserBalanceUsdc(balanceUsdc)
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
			<UserActionsCard actions={userActions} />
		</div>
	)
}
