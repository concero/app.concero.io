import classNames from './RewardsScreen.module.pcss'
import { RewardsCard } from '../../cards/RewardsCard/RewardsCard'
import { QuestsCard } from '../../cards/QuestsCard/QuestsCard'
import { LeaderboardCard } from '../../cards/LeaderboardCard/LeaderboardCard'
import { useEffect, useState } from 'react'
import { fetchUserByAddress } from '../../../api/concero/user/fetchUserByAddress'
import { useAccount } from 'wagmi'
import { type IUser } from '../../../api/concero/user/userType'
import { createUser } from '../../../api/concero/user/createUser'

const InfoTitle = () => {
	return (
		<a className={classNames.infoTitle} href="/">
			<h5>Build the next big thing with Concero</h5>
			<span className="body3">Click here to learn the benefits</span>
		</a>
	)
}

export const RewardsScreen = () => {
	const { address } = useAccount()
	const [user, setUser] = useState<IUser>()

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
		<div className={classNames.rewardsScreenContainer}>
			<div className={classNames.rewardsWrap}>
				<RewardsCard user={user} />
				<QuestsCard />
				<LeaderboardCard user={user} />
			</div>

			<InfoTitle />
		</div>
	)
}
