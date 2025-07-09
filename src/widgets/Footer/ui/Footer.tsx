import clsx from 'clsx'
import cls from './Footer.module.pcss'
import Logo from '@/shared/assets/icons/monochrome/Concero_logo.svg?react'
import LogoX from '@/shared/assets/icons/social_X_filled.svg?react'
import LogoDiscord from '@/shared/assets/icons/social_discord_filled.svg?react'
import LogoMedium from '@/shared/assets/icons/social_medium_filled.svg?react'
type TProps = {
	className?: string
}
export const Footer = (props: TProps) => {
	const { className } = props
	return (
		<div className={clsx(className, cls.footer)}>
			<Logo className={cls.logo_wrap} />
			<div className={cls.list_icons}>
				<LogoX />
				<LogoDiscord />
				<LogoMedium />
			</div>
		</div>
	)
}
