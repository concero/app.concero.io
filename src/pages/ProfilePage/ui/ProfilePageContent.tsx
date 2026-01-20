import { TUserResponse } from '@/entities/User'
import cls from './ProfilePage.module.pcss'
import { truncateWallet } from '@/utils/formatting'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
import { PageWrap } from '@/shared/ui/PageWrap/PageWrap'
import { Address } from 'viem'
import { AchievementGroupPreview } from '@/entities/Achievement'
import { Separator } from '@/components/layout/Separator/Separator'
import { OpenHistoryUserActions } from '@/features/User'
import { AccoutSettings } from '@/features/User'
import { Banners } from '@/entities/Social'
import { Leaderboard } from './Leaderboard/Leaderboard'
import { SocialsGroup } from './SocialsGroup/SocialsGroup'
import { OAuth2_0 } from './OAuth2_0/OAuth2_0'
import { isAdminAddress } from '@/shared/lib/tests/isAdminAddress'

export const ProfilePageContent = ({ user }: { user: TUserResponse }) => {
	const addresToShow = truncateWallet(user.address, 4)
	const isAdmin = isAdminAddress(user.address)
	return (
		<PageWrap className={cls.page_wrap} key={'PageWrap'}>
			{user.address && isAdmin ? <OAuth2_0 address={user.address} /> : null}
			<Banners key={'Banners'} />
			<div className={cls.profile_card_wrap}>
				<div className={cls.profile_header}>
					<div className={cls.roles}></div>
					<div className={cls.setting_wrap}>
						<OpenHistoryUserActions
							user={user}
							text="History"
							buttonProps={{
								size: 's',
								variant: 'secondary',
							}}
							className={cls.open_history_btn}
						/>
						<AccoutSettings user={user} key={user.id} />
					</div>
				</div>
				<div className={cls.user_info}>
					<div className={cls.account_info}>
						<Avatar address={user.address as Address} className={cls.avatar} />
						<div className={cls.wrap_nick_address}>
							<span className={cls.nickname}>{user.nickname ?? 'Nickname'}</span>
							<span className={cls.address}>{addresToShow}</span>
						</div>
					</div>
					<SocialsGroup user={user} />
				</div>
				<Separator />
				<div className={cls.achiev_wrap}>
					<AchievementGroupPreview />
				</div>
			</div>
			<Leaderboard />
		</PageWrap>
	)
}
