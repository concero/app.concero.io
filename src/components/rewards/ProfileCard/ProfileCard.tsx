import classNames from './ProfileCard.module.pcss'
import { Card } from '../../cards/Card/Card'
import BlockiesSvg from 'blockies-react-svg'
import { truncateWallet } from '../../../utils/formatting'

import { Button } from '../../buttons/Button/Button'
import { UserHistory } from '../../modals/RewardsUserHistory/RewardsUserHistory'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { TUserResponse } from '@/entities/User'

interface ProfileHeaderProps {
	user: TUserResponse
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

interface ProfileCardProps {
	user: TUserResponse
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

export const ProfileCard = ({ user }: ProfileCardProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<Card className={classNames.container}>
			<ProfileHeader setIsOpen={setIsOpen} user={user} />
			<UserHistory user={user} isOpen={isOpen} setIsOpen={setIsOpen} />
		</Card>
	)
}
