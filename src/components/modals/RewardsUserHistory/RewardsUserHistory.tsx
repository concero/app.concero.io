import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { Modal } from '../Modal/Modal'
import classNames from './RewardsUserHistory.module.pcss'
import { UserAction } from './UserAction'
import { type IUserAction } from '../../../api/concero/userActions/userActionType'
import { fetchUserActions } from '../../../api/concero/userActions/fetchUserActions'
import { useInfiniteQuery } from '@tanstack/react-query'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TUserResponse } from '@/entities/User'
import { Spinner } from '@concero/ui-kit'

interface UserHistoryProps {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
	user: TUserResponse
}
/**@deprecated */
export const UserHistory = ({ isOpen, setIsOpen, user }: UserHistoryProps) => {
	const [userActions, setUserActions] = useState<IUserAction[]>([])

	const fetchAndSetUserActions = async () => {
		const response = await fetchUserActions(user.address)
		setUserActions(response.data)
	}

	useEffect(() => {
		if (!isOpen || userActions.length > 0) return

		fetchAndSetUserActions().catch(e => {
			console.error(e)
		})
	}, [isOpen])

	return (
		<Modal show={isOpen} setShow={setIsOpen} title="History" className={classNames.historyModal}>
			<div className={classNames.historyWrapper}>
				{!user && <h4>Connect wallet to see your history</h4>}
				{status === 'pending' && (
					<div className={classNames.loaderWrap}>
						<Spinner />
					</div>
				)}
				{status === 'error' && <p>{t('utils.couldNotLoadData')}</p>}
				{data && (
					<div className={classNames.headerHistory}>
						<span className={classNames.action}>Action</span>
						<div className={classNames.wrapCersDate}>
							<div className={classNames.cers}>CERs</div>
							<div className={classNames.date}>Date</div>
						</div>
					</div>
				)}
				{data?.pages.map((page, pageIndex) => (
					<React.Fragment key={pageIndex}>
						{page.data.map((action: IUserAction) => (
							<UserAction key={JSON.stringify(action)} action={action} />
						))}
					</React.Fragment>
				))}
			</div>
		</Modal>
	)
}
