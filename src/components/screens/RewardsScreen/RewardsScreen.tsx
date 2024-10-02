import classNames from './RewardsScreen.module.pcss'
import { ProfileCard } from '../../rewards/ProfileCard/ProfileCard'
import { QuestsGroup } from '../../rewards/Quests/QuestsGroup/QuestsGroup'
import { LeaderboardCard } from '../../rewards/LeaderboardCard/LeaderboardCard'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { type IUser } from '../../../api/concero/user/userType'
import { StreaksCard } from '../../rewards/StreaksCard/StreaksCard'
import { Footer } from '../../rewards/Footer/Footer'
import type { IUserAction } from '../../../api/concero/userActions/userActionType'
import { fetchUserActions } from '../../../api/concero/userActions/fetchUserActions'
import { type Address } from 'viem'
import { handleFetchUser } from '../../../web3/handleFetchUser'
import { LoyaltyBonus } from '../../rewards/LoyaltyBonus/LoyaltyBonus'

export const RewardsScreen = () => {
	const { address } = useAccount()
	const [user, setUser] = useState<IUser>()
	const [userActions, setUserActions] = useState<IUserAction[]>([])

	const fetchAndSetUserActions = async () => {
		const response = await fetchUserActions(address!)
		setUserActions(response)
	}

	useEffect(() => {
		if (address) {
			void Promise.all([fetchAndSetUserActions(), getUser(address)])
		}
	}, [address])

	const getUser = async (userAddress: Address) => {
		const currentUser = await handleFetchUser(userAddress)
		setUser(currentUser!)
	}

	return (
		<>
			<div className={classNames.rewardsScreenContainer}>
				<div className={classNames.rewardsWrap}>
					{user && (
						<div className="gap-lg">
							<ProfileCard userActions={userActions} user={user} />
							<LoyaltyBonus user={user} />
							<StreaksCard user={user} />
						</div>
					)}
					<QuestsGroup user={user} />
					<LeaderboardCard user={user} />
				</div>
			</div>

			<Footer />
		</>
	)
}
