import classNames from './LeaderboardCard.module.pcss'
import { Card } from '../Card/Card'
import { truncateWallet } from '../../../utils/formatting'
import BlockiesSvg from 'blockies-react-svg'
import { useEffect, useState } from 'react'
import { type IUser } from '../../../api/concero/user/userType'
import { fetchUsers } from '../../../api/concero/user/fetchUsers'
import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { publicClient } from '../RewardsCard/RewardsCard'

interface MemberProps {
	user: IUser
	place: number
}

const Member = ({ user, place }: MemberProps) => {
	const { address: currentUserAddress } = useAccount()
	const [ensName, setEnsName] = useState<string | null>(null)
	const { address, points } = user

	const walletAddress = <span className="body1">{address && truncateWallet(address)}</span>
	const isCurrentUser = currentUserAddress?.toLowerCase() === address.toLowerCase()

	const getEnsName = async () => {
		const name = await publicClient.getEnsName({
			address: address as Address,
		})

		setEnsName(name)
	}

	useEffect(() => {
		getEnsName()
	}, [])

	return (
		<div className="row jsb ac">
			<div className="row ac gap-md">
				<span>{place}</span>
				<BlockiesSvg address={address} className={classNames.avatar} />
				{ensName && <h5>{ensName}</h5>}
				{isCurrentUser ? <div className={classNames.youTag}>You</div> : walletAddress}
			</div>
			<h5>{points.toFixed(4)}</h5>
		</div>
	)
}

interface LeaderboardCardProps {
	user: IUser | null | undefined
}

export const LeaderboardCard = ({ user }: LeaderboardCardProps) => {
	const [users, setUsers] = useState<IUser[]>([])
	const [currentUserPosition, setCurrentUserPosition] = useState<number | null>(null)

	const handleFetchUsers = async () => {
		const { users, currentUserPosition } = await fetchUsers(user?.points)
		console.log({ users, currentUserPosition })

		setUsers(users)
		setCurrentUserPosition(currentUserPosition)
	}

	useEffect(() => {
		void handleFetchUsers()
	}, [user])

	return (
		<div className="gap-md">
			<div className={classNames.leaderboardHeader}>
				<h4>Leaderboard</h4>
			</div>
			<Card className="gap-md">
				{users.map((user, i) => (
					<Member key={user.address} place={i + 1} user={user} />
				))}
				{currentUserPosition && user && currentUserPosition > 4 && (
					<Member user={user} place={currentUserPosition} />
				)}
			</Card>
		</div>
	)
}
