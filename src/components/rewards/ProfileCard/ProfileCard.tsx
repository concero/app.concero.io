import classNames from './ProfileCard.module.pcss'
import { Card } from '../../cards/Card/Card'
import BlockiesSvg from 'blockies-react-svg'
import { truncateWallet } from '../../../utils/formatting'

import { type IUser } from '../../../api/concero/user/userType'
import { createPublicClient } from 'viem'
import { mainnet } from 'wagmi/chains'
import { http } from 'wagmi'
import { Button } from '../../buttons/Button/Button'
import { UserHistory } from '../../modals/RewardsUserHistory/RewardsUserHistory'
import { type Dispatch, type SetStateAction, useState } from 'react'

interface ProfileHeaderProps {
	user: IUser
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

interface ProfileCardProps {
	user: IUser
}

export const publicClient = createPublicClient({
	chain: mainnet,
	transport: http(),
})

const ProfileHeader = ({ user, setIsOpen }: ProfileHeaderProps) => {
	return (
		<div className={classNames.header}>
			<div className="row gap-sm ac">
				{user && <BlockiesSvg address={user.address} className={classNames.avatar} />}
				<div className="afs">
					<h5>{truncateWallet(user.address)}</h5>
				</div>
			</div>
			<Button onClick={setIsOpen} variant={'secondary'} size={'sm'}>
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
			<UserHistory isOpen={isOpen} setIsOpen={setIsOpen} />
		</Card>
	)
}
