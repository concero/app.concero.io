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
import { RewardsProfile } from '../../rewards/RewardsProfile/RewardsProfile'

export const RewardsScreen = () => {
	const { address } = useAccount()
	const [user, setUser] = useState<IUser | null>(null)
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
		setUser(currentUser)
	}

	return (
		<div className={classNames.rewardsScreenContainer}>
			<div className={classNames.rewardsWrapper}>
				<RewardsProfile user={user} userActions={userActions} />
				<QuestsGroup user={user} />
				<LeaderboardCard user={user} />
			</div>
		</div>
	)
}
