import { TUserResponse } from '@/entities/User'
import { Button, Spinner } from '@concero/ui-kit'
import clsx from 'clsx'
import cls from './HistoryUserActions.module.pcss'
import { useUserAction } from '@/entities/User/api/userApi'
import { Text } from '@/shared/ui'
import { Separator } from '@/components/layout/Separator/Separator'
import { HStack } from '@/shared/ui/Stack'
import { Table, TColumn } from '@/shared/ui/Table/Table'
import { TUserActionResponse } from '@/entities/User'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery'
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
		renderCell: (value: string, record) => {
			return <HStack gap="space_0_5">{getUserActionPoints(value)}</HStack>
		},
	},
	{
		key: 'executedAt',
		title: 'Date',
		renderCell: (value: string) => (
			<Text variant="body_medium" className={cls.text}>
				{value}
			</Text>
		),
	},
]
const columnsMobileView: TColumn<TUserActionResponse['actions'][number]>[] = [
	{
		key: 'data',
		title: 'User',
		renderCell: (value: string, record) => {
			return (
				<HStack gap="space_0_75" align="start">
					ad
				</HStack>
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
	console.log({ prepareForTableData })

	return (
		<div className={clsx(cls.history_wrapper, className)}>
			<div className={cls.header_history}>
				<div className={cls.action}>Action</div>
				<div className={cls.cers}>CERs</div>
				<div className={cls.date}>Date</div>
			</div>
			<div className={cls.separator_wrap}>
				<Separator />
			</div>
			<div className={cls.scrollable_content}>
				{data && (
					<>
						<Table
							columns={isMobileView ? columnsMobileView : columns}
							showHeader={!isMobileView}
							className={cls.table}
							data={prepareForTableData}
						/>
						{hasNextPage && (
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
						)}
					</>
				)}
			</div>
		</div>
	)
}
