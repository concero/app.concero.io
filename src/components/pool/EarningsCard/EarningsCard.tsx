import classNames from './EarningsCard.module.pcss'
import { useEffect, useState } from 'react'
import { UserActions } from '../UserActions/UserActions'
import { PoolCard } from '../PoolCard/PoolCard'
import { Card } from '../../cards/Card/Card'
import { useAccount } from 'wagmi'
import { getUserLpBalance } from '../poolScripts/getUserLpBalance'
import { SkeletonLoader } from '../../layout/SkeletonLoader/SkeletonLoader'
import { fetchUserEarnings, type UserEarnings } from '../../../api/concero/fetchUserEarnings'
import { ArrowUpIcon } from '../../../assets/icons/ArrowUpIcon'
import { toLocaleNumber } from '../../../utils/formatting'
import { Tag } from '../../tags/Tag/Tag'

export interface Props {
	poolIsFilled: boolean
	poolDataIsLoading: boolean
}

export const EarningsCard = ({ poolIsFilled, poolDataIsLoading }: Props) => {
	const { isDisconnected, address } = useAccount()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [userEarnings, setUserEarnings] = useState<UserEarnings | null>(null)

	const [userIsNotDeposited, setUserIsNotDeposited] = useState<boolean>(true)

	const getTotalVolume = async () => {
		if (!address) return

		try {
			setIsLoading(true)
			const userBalance = await getUserLpBalance(address)

			if (userBalance <= 0) {
				setIsLoading(false)
				return
			}

			setUserIsNotDeposited(false)
			const userEarnings = await fetchUserEarnings(address)
			setUserEarnings(userEarnings)

			setIsLoading(false)
		} catch (e) {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		void getTotalVolume()
	}, [address])

	const footer = (
		<div className={classNames.footer}>
			{poolDataIsLoading ? (
				<>
					<div className="gap-sm row">
						<SkeletonLoader height={48} width={177} />
						<SkeletonLoader height={48} width={177} />
					</div>
					<SkeletonLoader height={48} width={190} />
				</>
			) : (
				<>
					<div className={classNames.poolButtons}>
						<PoolCard
							poolIsFilled={poolIsFilled}
							userIsNotDeposited={userIsNotDeposited}
							depositButtonClasses={classNames.button}
							withdrawalButtonClasses={classNames.button}
						/>
					</div>

					<UserActions isDisabled={userIsNotDeposited} />
				</>
			)}
		</div>
	)

	if (isDisconnected || userIsNotDeposited) {
		return (
			<Card className={classNames.earnings}>
				<h4>Your Earnings</h4>
				<div className={classNames.placeholder}>
					<div className={classNames.placeholderText}>
						{isDisconnected ? (
							<h2>
								Connect wallet <br /> to manage your earnings
							</h2>
						) : (
							<>
								<h2>You haven't deposited yet</h2>
								<p>Make your first deposit to start earn in this pool.</p>
							</>
						)}
					</div>
				</div>
				{footer}
			</Card>
		)
	}

	return (
		<Card className={classNames.earnings}>
			<div className={classNames.header}>
				<div className="row gap-sm ac">
					<h4 className={classNames.title}>Your Earnings</h4>
				</div>
			</div>
			<div className="row afe gap-sm">
				<div className={classNames.price}>
					{isLoading || !userEarnings ? (
						<SkeletonLoader className={classNames.value} width={244} height={68} />
					) : (
						<h1>${toLocaleNumber(userEarnings.earnings + userEarnings.deposit, 2)}</h1>
					)}

					{isLoading || !userEarnings ? (
						<SkeletonLoader className={classNames.value} width={149} height={32} />
					) : (
						<Tag variant="positive" size="md">
							<ArrowUpIcon />
							&nbsp; ${toLocaleNumber(userEarnings.earnings, 2)}
							&nbsp; ({toLocaleNumber(userEarnings.percents, 2)}%)
						</Tag>
					)}
				</div>
			</div>

			{footer}
		</Card>
		// <ChartCard
		// 	className={classNames.earnings}
		// 	titleCard="Your Earnings"
		// 	subtitle="Earnings from all time"
		// 	filterItems={timeFilters}
		// 	activeItem={activeFilter}
		// 	setActiveItem={setActiveFilter}
		// 	data={earningsData}
		// 	commonValue={`$${toLocaleNumber(commonValue, 2)}`}
		// 	footer={footer}
		// 	isLoading={isLoading}
		// />
	)
}
