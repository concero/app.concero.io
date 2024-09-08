import classNames from './ProfileCard.module.pcss'
import { Card } from '../Card/Card'
import BlockiesSvg from 'blockies-react-svg'
import { truncateWallet } from '../../../utils/formatting'

import { type IUser } from '../../../api/concero/user/userType'
import { createPublicClient } from 'viem'
import { mainnet } from 'wagmi/chains'
import { http } from 'wagmi'

interface RewardsCardProps {
	user: IUser
}

export const publicClient = createPublicClient({
	chain: mainnet,
	transport: http(),
})

const ProfileHeader = ({ user }: RewardsCardProps) => {
	return (
		<div className={classNames.header}>
			<div className="row gap-md ac">
				{user && <BlockiesSvg address={user.address} className={classNames.avatar} />}
				<div className="afs">
					<h4>{truncateWallet(user.address)}</h4>
				</div>
			</div>
		</div>
	)
}

export const ProfileCard = ({ user }: RewardsCardProps) => {
	return (
		<Card className={classNames.container}>
			<ProfileHeader user={user} />
			{/* <SocialNetworkButtons user={user} /> */}
		</Card>
	)
}
