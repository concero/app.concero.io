import classNames from './RewardsScreen.module.pcss'
import { QuestsGroup } from '../../rewards/Quests/QuestsGroup/QuestsGroup'
import { LeaderboardCard } from '../../rewards/LeaderboardCard/LeaderboardCard'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { type IUser } from '../../../api/concero/user/userType'
import type { IUserAction } from '../../../api/concero/userActions/userActionType'
import { fetchUserActions } from '../../../api/concero/userActions/fetchUserActions'
import { type Address } from 'viem'
import { handleFetchUser } from '../../../web3/handleFetchUser'
import { ProfilePlaceholder } from '../../rewards/ProfileCard/ProfilePlaceholder/ProfilePlaceholder'
import { StreaksPlaceholders } from '../../rewards/StreaksCard/StreakCard/StreakPlaceholder/StreakPlaceholder'
import { RewardsProfile } from '../../rewards/RewardsProfile/RewardsProfile'

export const RewardsScreen = () => {
	const { address, isConnected } = useAccount()
	const [user, setUser] = useState<IUser>()
	const [loading, setIsLoading] = useState<boolean>(false)

	const getUser = async (userAddress: Address) => {
		const currentUser = await handleFetchUser(userAddress)
		setUser(currentUser!)
	}

	useEffect(() => {
		if (isConnected && address) {
			setIsLoading(true)
			void getUser(address)
				.catch(e => {
					console.error(e)
				})
				.finally(() => {
					setIsLoading(false)
				})
		}
	}, [isConnected, address])

	return (
		<div className={classNames.rewardsScreenContainer}>
			<div className={classNames.rewardsWrapper}>
				{isConnected &&
					(loading ? (
						<>
							<ProfilePlaceholder />
							<StreaksPlaceholders />
						</>
					) : (
						user && <RewardsProfile user={user} />
					))}
				<QuestsGroup user={user} />
				<LeaderboardCard user={user} />
			</div>
		</div>
	)
}
