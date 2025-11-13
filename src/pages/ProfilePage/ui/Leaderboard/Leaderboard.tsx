import { HStack, VStack } from '@/shared/ui/Stack'
import { Table, TColumn } from '@/shared/ui/Table/Table'
import cls from './Leaderboard.module.pcss'
import { Avatar, Text } from '@/shared/ui'
import { Tag } from '@concero/ui-kit'
import { TUserResponse, useGetLeaderboard, useUser } from '@/entities/User'
import { truncateWallet } from '@/utils/formatting'
import { TApiResponse } from '@/shared/types/api'
import { UseQueryResult } from '@tanstack/react-query'
import { TGetLeaderBoardReponse } from '@/entities/User/model/types/response'
import { Address } from 'viem'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery'

const numberFormat = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 3,
	maximumFractionDigits: 3,
})
export const Leaderboard = () => {
	const user = useUser()
	const isMobileView = useMediaQuery('mobile', 'only')
	const { data: leaders } = useGetLeaderboard(user.data?.payload?.address, 100)
	const userList = leaders?.users

	const columns: TColumn<TGetLeaderBoardReponse['users'][number]>[] = [
		{
			key: 'rank',
			title: 'Rank',
			renderCell: (value: string) => <Text variant="body_medium">{value}</Text>,
			renderHeader: () => (
				<HStack>
					<Text variant="heading_small" className={cls.secondary_text}>
						Rank
					</Text>
				</HStack>
			),
			width: 128,
		},
		{
			key: 'user',
			title: 'User',
			renderHeader: () => (
				<HStack max>
					<Text variant="heading_small" className={cls.secondary_text}>
						User
					</Text>
				</HStack>
			),
			renderCell: (value: string, record) => {
				return (
					<HStack
						gap="space_0_5"
						htmlProps={{
							style: {
								width: 'calc(100% - 24px)',
							},
						}}
					>
						<div>
							<Avatar address={record.address as Address} className={cls.avatar} />
						</div>
						<Text variant="heading_small" className={cls.text} ellipsis>
							{record.nickname ?? truncateWallet(record.address)}
						</Text>
						{user.data?.payload?.address &&
						user.data.payload.address.toLowerCase().trim() == record.address.toLowerCase().trim() ? (
							<Tag size="s" variant="neutral">
								You
							</Tag>
						) : null}
					</HStack>
				)
			},
		},
		{
			key: 'points',
			title: 'CERs',
			renderCell: (value: string) => (
				<Text variant="body_medium" className={cls.text}>
					{numberFormat.format(Number(value))}
				</Text>
			),
		},
	]
	const columnsMobileView: TColumn<TGetLeaderBoardReponse['users'][number]>[] = [
		{
			key: 'user',
			title: 'User',
			renderCell: (value: string, record) => {
				return (
					<HStack gap="space_0_75" align="start" max>
						<HStack
							gap="space_0_25"
							htmlProps={{
								style: {
									minWidth: '69px',
								},
							}}
						>
							<Text variant="body_medium">#</Text>
							<Text variant="body_medium" className={cls.text}>
								{record.rank}
							</Text>
						</HStack>
						<VStack
							gap="space_0_5"
							max
							htmlProps={{
								style: {
									overflow: 'auto',
								},
							}}
						>
							<HStack
								gap="space_0_5"
								htmlProps={{
									style: {
										width: 'calc(100% - 24px)',
									},
								}}
							>
								<div>
									<Avatar address={record.address as Address} className={cls.avatar} />
								</div>
								<Text variant="heading_small" className={cls.text} ellipsis>
									{record.nickname ?? truncateWallet(record.address)}
								</Text>
								{user.data?.payload?.address &&
								user.data.payload.address.toLowerCase().trim() ==
									record.address.toLowerCase().trim() ? (
									<Tag size="s" variant="neutral">
										You
									</Tag>
								) : null}
							</HStack>
							<HStack gap="space_0_25">
								<Text variant="body_medium" className={cls.text}>
									{numberFormat.format(Number(record.points))}
								</Text>
								<Text variant="body_medium">CERs</Text>
							</HStack>
						</VStack>
					</HStack>
				)
			},
		},
	]
	return (
		<VStack gap="space_1" className={cls.card}>
			<Text variant="heading_large" className={cls.title}>
				Leaderboard
			</Text>
			<VStack gap="space_1" max className={cls.content}>
				<UserRow leaders={userList} user={user} />
				{userList ? (
					<Table
						columns={isMobileView ? columnsMobileView : columns}
						showHeader={!isMobileView}
						className={cls.table}
						data={userList.filter(user => user.rank <= 99)}
					/>
				) : null}
			</VStack>
		</VStack>
	)
}

const UserRow = ({
	leaders,
	user,
}: {
	user: UseQueryResult<TApiResponse<TUserResponse | null>, TApiResponse<any, string>>
	leaders:
		| {
				address: string
				points: number
				rank: number
				nickname?: string | null | undefined
		  }[]
		| undefined
}) => {
	const isMobileView = useMediaQuery('mobile', 'only')

	if (!leaders || !user || !user.data || !user.data.payload) {
		return null
	}
	const userData = user.data.payload
	const foundedLeaderUser = leaders.find(
		leader => leader.address.toLowerCase().trim() === userData.address.toLowerCase().trim(),
	)

	if (!foundedLeaderUser) return null
	if (isMobileView) {
		return (
			<HStack className={cls.user_row} gap="space_0_75" max align="start">
				<HStack
					gap="space_0_25"
					htmlProps={{
						style: {
							width: '57px',
						},
					}}
				>
					<Text variant="body_medium" className={cls.secondary_text}>
						#
					</Text>
					<Text variant="body_medium" className={cls.text}>
						{foundedLeaderUser?.rank}
					</Text>
				</HStack>

				<VStack gap="space_0_5">
					<HStack
						gap="space_0_5"
						htmlProps={{
							style: {
								width: 'calc(100% - 24px)',
							},
						}}
					>
						<div>
							<Avatar address={userData.address as Address} className={cls.avatar} />
						</div>
						<Text variant="heading_small" className={cls.text} ellipsis>
							{userData.nickname ?? truncateWallet(userData.address)}
						</Text>
						<Tag size="s" variant="neutral">
							You
						</Tag>
					</HStack>
					<HStack gap="space_0_25">
						<Text variant="body_medium" className={cls.text}>
							{numberFormat.format(Number(userData.points))}
						</Text>
						<Text variant="body_medium">CERs</Text>
					</HStack>
				</VStack>
			</HStack>
		)
	}
	return (
		<HStack className={cls.user_row} max>
			<HStack
				htmlProps={{
					style: {
						height: '24px',
					},
				}}
				align="center"
			>
				<Text variant="body_medium" className={cls.text}>
					{foundedLeaderUser?.rank}
				</Text>
			</HStack>
			<HStack gap="space_0_5">
				<Avatar address={userData.address as Address} className={cls.avatar} />
				<Text variant="heading_small">{userData.nickname ?? truncateWallet(userData.address)}</Text>
				<Tag size="s" variant="neutral">
					You
				</Tag>
			</HStack>
			<div>
				<Text variant="body_medium">{numberFormat.format(Number(userData.points))}</Text>
			</div>
		</HStack>
	)
}
