import { Separator } from '@/components/layout/Separator/Separator'
import { ReactNode } from 'react'
import cls from './AccoutSettingsUI.module.pcss'
type TProps = {
	NicknameConnect?: ReactNode
	DiscordConnect?: ReactNode
	XConnect?: ReactNode
	EmailConnect?: ReactNode
}

export const AccoutSettingsUI = (props: TProps) => {
	const { DiscordConnect, EmailConnect, NicknameConnect, XConnect } = props
	return (
		<div className={cls.wrap_account_settings}>
			<div className={cls.wrap_profile}>
				<span className={cls.profile_title}>Profile</span>
				{NicknameConnect}
			</div>
			<Separator />
			<div className={cls.wrap_socials}>
				<div className={cls.wrap_socials_title}>
					<span className={cls.socials_title}>Socials</span>
					<span className={cls.socials_description}>
						One of each social account can be linked to only one profile
					</span>
				</div>
				<div className={cls.wrap_list_socials}>
					{DiscordConnect ? <div>{DiscordConnect}</div> : null}
					{XConnect ? <div>{XConnect}</div> : null}
					{EmailConnect ? <div>{EmailConnect}</div> : null}
				</div>
			</div>
		</div>
	)
}
