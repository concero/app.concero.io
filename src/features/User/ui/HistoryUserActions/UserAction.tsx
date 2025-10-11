import { formatDateTime } from '@/utils/formatting'
import clsx from 'clsx'
import cls from './HistoryUserActions.module.pcss'
import { getUserActionName, UserActionProps } from '../../model/lib/history/getUserActionName'
import { getUserActionPoints } from '../../model/lib/history/getUserActionPoints'

export const UserAction = ({ action }: UserActionProps) => {
	const timestampInMs = action.executedAt.toString().length === 10 ? action.executedAt * 1000 : action.executedAt
	const formattedDate = formatDateTime(new Date(timestampInMs), 'D MMM YYYY, HH:mm')

	return (
		<div className={clsx(cls.user_action)}>
			{getUserActionName({ action })}
			<div className={cls.meta_wrap}>
				<span className={clsx(cls.points)}>{getUserActionPoints(action.points)}CERs</span>
				<p className={clsx(cls.date)}>{formattedDate}</p>
			</div>
		</div>
	)
}
