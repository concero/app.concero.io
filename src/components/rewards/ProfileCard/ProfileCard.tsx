import classNames from './ProfileCard.module.pcss'
import { Card } from '../../cards/Card/Card'
import BlockiesSvg from 'blockies-react-svg'
import { truncateWallet } from '../../../utils/formatting'

import { type IUser } from '../../../api/concero/user/userType'
import { Button } from '../../buttons/Button/Button'
import { UserHistory } from '../../modals/RewardsUserHistory/RewardsUserHistory'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { type IUserAction } from '../../../api/concero/userActions/userActionType'

interface ProfileHeaderProps {
	user: IUser
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

interface ProfileCardProps {
	user: IUser
	userActions: IUserAction[]
}

const ProfileHeader = ({ user, setIsOpen }: ProfileHeaderProps) => {
	return (
		<div className={classNames.header}>
			<div className="row gap-sm ac">
				{user && <BlockiesSvg address={user.address} className={classNames.avatar} />}
				<div className="afs">
					<h5>{truncateWallet(user.address)}</h5>
				</div>
			</div>
			<Button
				onClick={() => {
					setIsOpen(true)
				}}
				variant={'secondary'}
				size={'sm'}
			>
				Open history
			</Button>
		</div>
	)
}

export const ProfileCard = ({ user, userActions }: ProfileCardProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<Card className={classNames.container}>
			<ProfileHeader setIsOpen={setIsOpen} user={user} />
			<UserHistory userActions={userActions} isOpen={isOpen} setIsOpen={setIsOpen} />
		</Card>
	)
}
