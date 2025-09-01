import { useAccount } from 'wagmi'
import LogoFilled from '@/shared/assets/icons/Logo_filled.svg?react'
import { HStack } from '@/shared/ui/Stack'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery'
import { useUserByAddress } from '@/entities/User'
import { LinkList } from '../LinkList/LinkList'
import { UserInfo } from '../UserInfo/UserInfo'
import { BurgerMenu } from '../BurgerMenu/BurgerMenu'
import { BurgerButton } from '../BurgerButton/BurgerButton'
import cls from './Header.module.pcss'

export const Header = () => {
	const { address } = useAccount()
	const { data: userResponse } = useUserByAddress(address)
	const user = userResponse?.payload
	const isDesktopOrLarger = useMediaQuery('desktop', 'up')

	const isMobile = useMediaQuery('mobile', 'only')

	return (
		<header className={cls.header}>
			<HStack gap="space_1" align="center" justify="center" className={cls.hstack}>
				{!isMobile && <LinkList className={cls.left_side} />}
				<LogoFilled className={cls.logo} />
				<HStack gap="space_0_5" className={cls.right_side}>
					<UserInfo shortView={!isDesktopOrLarger} />
					<BurgerButton menuContent={<BurgerMenu address={user?.address} nickname={user?.nickname} />} />
				</HStack>
			</HStack>
		</header>
	)
}
