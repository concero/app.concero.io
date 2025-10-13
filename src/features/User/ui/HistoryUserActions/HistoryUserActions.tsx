import { TUserResponse } from '@/entities/User'
import { Button, Spinner } from '@concero/ui-kit'
import clsx from 'clsx'
import cls from './HistoryUserActions.module.pcss'
import { useUserAction } from '@/entities/User/api/userApi'
import { Text } from '@/shared/ui'
import { Separator } from '@/components/layout/Separator/Separator'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Table, TColumn } from '@/shared/ui/Table/Table'
import { TUserActionResponse } from '@/entities/User'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery'
import { getUserActionName } from '../../model/lib/history/getUserActionName'
import { getUserActionPoints } from '../../model/lib/history/getUserActionPoints'
import { formatDateTime } from '@/utils/formatting'

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
		renderCell: (value: string, record) => {
			return (
				<Text variant="heading_small" className={cls.cers_text}>
					{getUserActionPoints(value)}
				</Text>
			)
		},
	},
	{
		key: 'executedAt',
		title: 'Date',
		renderCell: (value: string | number) => {
			const timestampInMs = value.toString().length === 10 ? Number(value) * 1000 : value
			const formattedDate = formatDateTime(new Date(timestampInMs), 'D MMM YYYY, HH:mm')

			return (
				<Text variant="body_medium" className={cls.date_text}>
					{formattedDate}
				</Text>
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
						<Text variant="heading_small" className={cls.cers_text}>
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
{
	/* {hasNextPage && (
	<div className={clsx(cls.user_action, cls.load_next_wrap)}>
		<Button
			onClick={() => fetchNextPage()}
			isDisabled={isFetchingNextPage}
			variant="secondary"
			size="m"
		>
			{isFetchingNextPage ? 'Loading...' : 'Load More'}
		</Button>
	</div>
)} */
}
