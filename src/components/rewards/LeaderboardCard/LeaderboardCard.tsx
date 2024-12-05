import classNames from './LeaderboardCard.module.pcss'
import { truncateWallet } from '../../../utils/formatting'
import BlockiesSvg from 'blockies-react-svg'
import { useEffect, useState } from 'react'
import { type IUser } from '../../../api/concero/user/userType'
import { fetchLeaderboard } from '../../../api/concero/user/fetchLeaderboard'
import { useAccount } from 'wagmi'
import { Tag } from '../../tags/Tag/Tag'

interface MemberProps {
	user: IUser
	place: number
}

const Member = ({ user, place }: MemberProps) => {
	const { address: currentUserAddress } = useAccount()
	const { address, points } = user

	const walletAddress = <p className="body2">{address && truncateWallet(address)}</p>
	const isCurrentUser = currentUserAddress?.toLowerCase() === address.toLowerCase()

	return (
		<div className={classNames.tableRow}>
			<div className={classNames.tableCell}>
				<p className="body2">{place}</p>
			</div>
			<div className={classNames.tableCell}>
				<div className="row ac gap-sm">
					<BlockiesSvg address={address} className={classNames.avatar} />
					{walletAddress}
					<div className={classNames.currentUser}>
						{isCurrentUser && (
							<Tag size="sm" variant={'neutral'}>
								You
							</Tag>
						)}
					</div>
				</div>
			</div>
			<div className={classNames.tableCell}>
				<p className="body2">{points.toFixed(4)}</p>
			</div>
		</div>
	)
}

interface LeaderboardCardProps {
	user: IUser | null | undefined
}

interface LeaderboardTableProps {
	users: IUser[]
}

const LeaderboardTable = ({ users }: LeaderboardTableProps) => {
	return (
		<div className={classNames.table}>
			<div className={classNames.tableRow}>
				<div className={classNames.tableCell}>
					<h6>#</h6>
				</div>
				<div className={classNames.tableCell}>
					<h6>User</h6>
				</div>
				<div className={classNames.tableCell}>
					<h6>CERs collected</h6>
				</div>
			</div>
			{users.map(user => (
				<Member key={user.address} place={user.position} user={user} />
			))}
		</div>
	)
}

export const LeaderboardCard = ({ user }: LeaderboardCardProps) => {
	const [users, setUsers] = useState<IUser[]>([])

	const handleFetchUsers = async (userAddress: string | undefined) => {
		const { users } = await fetchLeaderboard(userAddress)
		setUsers(users)
	}

	useEffect(() => {
		void handleFetchUsers(user?.address)
	}, [user])

	return (
		<div className="gap-md">
			<div className={classNames.leaderboardHeader}>
				<h6>Leaderboard</h6>
			</div>
			<LeaderboardTable users={users} />
		</div>
	)
}
