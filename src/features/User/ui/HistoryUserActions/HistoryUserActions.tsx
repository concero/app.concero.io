import { fetchUserActions } from '@/api/concero/userActions/fetchUserActions'
import { TUserResponse, userActionsService } from '@/entities/User'
import { Button, Spinner } from '@concero/ui-kit'
import { useInfiniteQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import cls from './HistoryUserActions.module.pcss'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { UserAction } from './UserAction'
import { Separator } from '@/components/layout/Separator/Separator'

type TProps = {
	className?: string
	user: TUserResponse
}

const LIMIT = 10

export const HistoryUserActions = ({ user, className }: TProps) => {
	const { t } = useTranslation()

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
		refetchOnMount: false,
		retry: 2,
		queryKey: ['userActions', user.address],
		queryFn: ({ pageParam = 1 }) =>
			userActionsService.fetchUserActions(user.address, { limit: LIMIT, page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: lastPage => {
			return lastPage.metaData.pageNumber >= lastPage.metaData.totalPage
				? undefined
				: lastPage.metaData.pageNumber + 1
		},
	})

	if (status === 'pending') {
		return (
			<div className={clsx(cls.loader_wrap)}>
				<Spinner />
			</div>
		)
	}

	if (status === 'error') {
		return <p>{t('utils.couldNotLoadData')}</p>
	}

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
						{data.pages.map((page, pageIndex) => (
							<React.Fragment key={pageIndex}>
								{page.data.map(action => (
									<UserAction key={JSON.stringify(action)} action={action} />
								))}
							</React.Fragment>
						))}
						{hasNextPage && (
							<div className={cls.load_next_wrap}>
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
