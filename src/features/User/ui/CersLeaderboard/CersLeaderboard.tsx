import { TUserResponse, userServiceApi } from '@/entities/User'
import { useEffect, useState } from 'react'
import cls from './CersLeaderboard.module.pcss'
import { Tag } from '@concero/ui-kit'
import BlockiesSvg from 'blockies-react-svg'
import { truncateWallet } from '@/utils/formatting'
import { useAccount } from 'wagmi'
import { TGetLeaderBoardReponse } from '@/entities/User/model/types/response'

interface MemberProps {
	user: TGetLeaderBoardReponse['users'][number]
	place: number
}
const Member = ({ user, place }: MemberProps) => {
	const { address: currentUserAddress } = useAccount()
	const { address, points } = user

	const walletAddress = <p className="body2">{address && truncateWallet(address)}</p>
	const isCurrentUser = currentUserAddress?.toLowerCase() === address.toLowerCase()

	return (
		<div className={cls.table_row}>
			<div className={cls.table_cell}>
				<p className="body2">{place}</p>
			</div>
			<div className={cls.table_cell}>
				<div className="row ac gap-sm">
					<BlockiesSvg address={address} className={cls.avatar} />
					{walletAddress}
					<div className={cls.current_user}>
						{isCurrentUser && (
							<Tag size="s" variant={'neutral'}>
								You
							</Tag>
						)}
					</div>
				</div>
			</div>
			<div className={cls.table_cell}>
				<p className="body2">{points.toFixed(3)}</p>
			</div>
		</div>
	)
}

interface LeaderboardCardProps {
	user: TUserResponse | null | undefined
}

interface LeaderboardTableProps {
	users: TGetLeaderBoardReponse['users']
}
const LeaderboardTable = ({ users }: LeaderboardTableProps) => {
	return (
		<div className={cls.table}>
			<div className={cls.table_row}>
				<div className={cls.table_cell}>
					<h6>#</h6>
				</div>
				<div className={cls.table_cell}>
					<h6>User</h6>
				</div>
				<div className={cls.table_cell}>
					<h6>CERs collected</h6>
				</div>
			</div>
			{users.map(user => (
				<Member key={user.address} place={user.rank} user={user} />
			))}
		</div>
	)
}
export const CersLeaderboard = ({ user }: LeaderboardCardProps) => {
	const [users, setUsers] = useState<TGetLeaderBoardReponse['users']>([])

	const handleFetchUsers = async (userAddress: string | undefined) => {
		const { users } = await userServiceApi.getLeaderboard({ userAddress })
		setUsers(users)
	}

	useEffect(() => {
		void handleFetchUsers(user?.address)
	}, [user])

	return (
		<div className={cls.leaderboard_wrapper}>
			<div className={cls.leaderboard_header}>
				<h6 className={cls.title_board}>Leaderboard</h6>
			</div>
			<LeaderboardTable users={users} />
		</div>
	)
}
