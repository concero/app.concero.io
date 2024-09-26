import classNames from './RewardsScreen.module.pcss'
import { ProfileCard } from '../../rewards/ProfileCard/ProfileCard'
import { QuestsGroup } from '../../rewards/Quests/QuestsGroup/QuestsGroup'
import { LeaderboardCard } from '../../rewards/LeaderboardCard/LeaderboardCard'
import { useEffect, useState } from 'react'
import { fetchUserByAddress } from '../../../api/concero/user/fetchUserByAddress'
import { useAccount } from 'wagmi'
import { type IUser } from '../../../api/concero/user/userType'
import { createUser } from '../../../api/concero/user/createUser'
import { StreaksCard } from '../../rewards/StreaksCard/StreaksCard'
import { Footer } from '../../rewards/Footer/Footer'
import type { IUserAction } from '../../../api/concero/userActions/userActionType'
import { fetchUserActions } from '../../../api/concero/userActions/fetchUserActions'

export const RewardsScreen = () => {
	const { address } = useAccount()
	const [user, setUser] = useState<IUser>()
	const [userActions, setUserActions] = useState<IUserAction[]>([])

	const fetchAndSetUserTransactions = async () => {
		const response = await fetchUserActions(address!)
		console.log('fetchAndSetUserTransactions', response)
		setUserActions(response)
	}

	useEffect(() => {
		if (address) {
			void fetchAndSetUserTransactions()
		}
	}, [address])

	const handleFetchUser = async () => {
		const currentUser = await fetchUserByAddress(address!)

		if (!currentUser) {
			const newUser = await createUser(address!)
			setUser(newUser)
			return
		}

		setUser(currentUser)
	}

	useEffect(() => {
		if (address) {
			void handleFetchUser()
		}
	}, [address])

	return (
		<>
			<div className={classNames.rewardsScreenContainer}>
				<div className={classNames.rewardsWrap}>
					{user && (
						<>
							<ProfileCard userActions={userActions} user={user} />
							<StreaksCard user={user} />
						</>
					)}
					<QuestsGroup user={user} />
					<LeaderboardCard user={user} />
				</div>
			</div>

			<Footer />
		</>
	)
}
