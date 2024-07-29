import classNames from './LeaderboardCard.module.pcss'
import { Button } from '../../buttons/Button/Button'
import { Card } from '../Card/Card'
import { useAccount } from 'wagmi'
import { truncateWallet } from '../../../utils/formatting'
import BlockiesSvg from 'blockies-react-svg'

interface MemberProps {
	address: `0x${string}`
}

const Member = ({ address }: MemberProps) => {
	return (
		<div className="row jsb ac">
			<div className="row ac gap-md">
				<BlockiesSvg address={address} className={classNames.avatar} />
				<h5>username</h5>
				<span className="body1">{address && truncateWallet(address)}</span>
			</div>
			<h5>1500</h5>
		</div>
	)
}

export const LeaderboardCard = () => {
	const { address } = useAccount()

	return (
		<div className="gap-md">
			<div className={classNames.leaderboardHeader}>
				<h4>Leaderboard</h4>
				<div className="row">
					<Button size="xs" className="body1" variant="black">
						This month
					</Button>
					<Button size="xs" className="body1" variant="black">
						All-time
					</Button>
				</div>
			</div>
			<Card className="gap-md">
				<Member address={address!} />
				<Member address={address!} />
				<Member address={address!} />
			</Card>
		</div>
	)
}
