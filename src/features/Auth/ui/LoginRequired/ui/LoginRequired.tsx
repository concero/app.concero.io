import { ConnectWallet } from '../../ConnectWallet/ConnectWallet'
import cls from './LoginRequired.module.pcss'
import LoginRequiredIcon from '@/shared/assets/icons/LoginRequiredIcon.svg?react'
export const LoginRequired = () => {
	return (
		<div className={cls.wrap}>
			<div className={cls.login_required}>
				<div className={cls.title}>Log in to Your Concero Profile</div>
				<div className={cls.image_wrap}>
					<LoginRequiredIcon />
				</div>
				<div className={cls.description}>
					Connect your wallet to access Quests, Campaigns, CERs rewards, Leaderboard and exclusive multipliers
				</div>
				<div className={cls.control_wrap}>
					<ConnectWallet />
				</div>
			</div>
		</div>
	)
}
