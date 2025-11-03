import { Spinner } from '@concero/ui-kit'
import clsx from 'clsx'
import { TUserResponse } from '@/entities/User'
import cls from './HistoryUserActions.module.pcss'
import { useUserAction } from '@/entities/User/api/userApi'
import { Text } from '@/shared/ui'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Table, TColumn } from '@/shared/ui/Table/Table'
import { TUserActionResponse } from '@/entities/User'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery'
import { formatDateTime } from '@/utils/formatting'
import { getUserActionName } from '../../model/lib/history/getUserActionName'
import { getUserActionPoints } from '../../model/lib/history/getUserActionPoints'

type TProps = {
	className?: string
	user: TUserResponse
}

const TAKE = 10

const columns: TColumn<TUserActionResponse['actions'][number], keyof TUserActionResponse['actions'][number]>[] = [
	{
		key: 'data',
		title: 'Action',
		renderCell: (value: string, record) => {
			return getUserActionName({ action: record })
		},
	},
	{
		key: 'points',
		title: 'CERs',
		renderHeader: () => {
			return (
				<HStack>
					<HStack max justify="start">
						<Text variant="heading_small" className={cls.text_header}>
							CERs
						</Text>
					</HStack>
					<HStack max justify="start">
						<Text variant="heading_small" className={cls.text_header}>
							Date
						</Text>
					</HStack>
				</HStack>
			)
		},
		renderCell: (_: string, record) => {
			const timestampInMs =
				record.executedAt.toString().length === 10 ? Number(record.executedAt) * 1000 : record.executedAt
			const formattedDate = formatDateTime(new Date(timestampInMs), 'D MMM YYYY, HH:mm')
			return (
				<HStack max>
					<HStack max>
						<Text
							variant="heading_small"
							className={clsx(cls.cers_text, { [cls.danger_text]: (record?.points ?? 0) < 0 })}
						>
							{getUserActionPoints(record.points)}
						</Text>
					</HStack>
					<HStack max>
						<Text variant="heading_small" className={cls.date_text}>
							{formattedDate}
						</Text>
					</HStack>
				</HStack>
			)
		},
	},
]
const columnsMobileView: TColumn<TUserActionResponse['actions'][number]>[] = [
	{
		key: 'data',
		title: 'User',
		renderCell: (value: string, record) => {
			const timestampInMs =
				record.executedAt.toString().length === 10 ? Number(record.executedAt) * 1000 : record.executedAt
			const formattedDate = formatDateTime(new Date(timestampInMs), 'D MMM YYYY, HH:mm')
			return (
				<VStack gap="space_0_5" className={cls.user_action} max>
					{getUserActionName({ action: record })}
					<HStack gap="12px" justify="between" max>
						<Text
							variant="heading_small"
							className={clsx(cls.cers_text, { [cls.danger_text]: (record?.points ?? 0) < 0 })}
						>
							{getUserActionPoints(record.points)}
						</Text>
						<Text variant="body_medium" className={cls.date_text}>
							{formattedDate}
						</Text>
					</HStack>
				</VStack>
			)
		},
	},
]

export const HistoryUserActions = ({ user, className }: TProps) => {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useUserAction({
		address: user.address,
		take: TAKE,
	})
	const isMobileView = useMediaQuery('mobile', 'only')
	if (status === 'pending') {
		return (
			<div className={clsx(cls.loader_wrap)}>
				<Spinner />
			</div>
		)
	}

	if (status === 'error') {
		return <Text variant="body_medium">Couldn’t load data</Text>
	}
	const prepareForTableData: TUserActionResponse['actions'] = []
	for (const page of data.pages) {
		if (page.payload?.actions) {
			for (const action of page.payload?.actions) {
				prepareForTableData.push(action)
			}
		}
	}

	return (
		<div className={clsx(cls.history_wrapper, className)}>
			{data && (
				<Table
					columns={isMobileView ? columnsMobileView : columns}
					showHeader={!isMobileView}
					className={cls.table}
					data={prepareForTableData}
					onScrollEnd={() => {
						fetchNextPage()
					}}
				/>
			)}
		</div>
	)
}
