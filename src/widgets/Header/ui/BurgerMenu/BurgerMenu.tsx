import { LogoutButton, ProfileButton } from '@/features/Auth'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { TUserResponse } from '@/entities/User'
import { ContactSupportButton } from '@/entities/Support'
import { VStack } from '@/shared/ui/Stack'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery'
import { routes } from '@/shared/consts/routing/routes'
import { IconButton } from '@concero/ui-kit'
import { Link, useMatch } from 'react-router-dom'
import GoalIcon from '@/shared/assets/icons/monochrome/Goal.svg?react'
import RocketIcon from '@/shared/assets/icons/monochrome/Rocket.svg?react'
import cls from './BurgerMenu.module.pcss'
import clsx from 'clsx'
import { useBurgerMenuContext } from '../../model/context/BurgerMenuContext'

type TBurgeMenuProps = {
	address?: string
	nickname?: TUserResponse['nickname']
}

export const BurgerMenu = (props: TBurgeMenuProps) => {
	const { address, nickname } = props
	const { closeMenu } = useBurgerMenuContext()
	const isTabletOrLess = useMediaQuery('tablet', 'down')
	const isMobile = useMediaQuery('mobile', 'only')
	const isQuestsPage = useMatch(routes.quests)
	const isTestingPage = useMatch(routes.testing)
	return (
		<VStack gap="space_0_75" className={cls.mobile_view}>
			{address && isTabletOrLess && (
				<>
					<ProfileButton address={address} nickname={nickname ?? null} onClick={closeMenu} />
					<div className={cls.spliiter}></div>
				</>
			)}
			{isMobile && (
				<>
					<Link
						style={{
							pointerEvents: isQuestsPage ? 'none' : 'all',
						}}
						className={cls.quest_link}
						to={routes.quests}
						onClick={() => {
							console.log('redirect')

							if (!isQuestsPage) {
								closeMenu?.()
							}
						}}
					>
						<IconButton variant={isQuestsPage ? 'secondary_color' : 'secondary'}>
							<GoalIcon />
						</IconButton>
						<div className={clsx(cls.link_btn, { [cls.active]: isQuestsPage })}>Quests</div>
					</Link>
					<Link
						style={{
							pointerEvents: isTestingPage ? 'none' : 'all',
							width: '100%',
						}}
						to={routes.testing}
						className={cls.quest_link}
						onClick={() => {
							if (!isTestingPage) {
								closeMenu?.()
							}
						}}
					>
						<IconButton variant={isTestingPage ? 'secondary_color' : 'secondary'}>
							<RocketIcon />
						</IconButton>

						<div className={clsx(cls.link_btn, { [cls.active]: isTestingPage })}>Testing</div>
					</Link>
				</>
			)}
			<ThemeSwitcher />
			<div className={cls.spliiter}></div>
			<ContactSupportButton />
			{address && (
				<>
					<div className={cls.spliiter}></div>
					<LogoutButton />
				</>
			)}
		</VStack>
	)
}
