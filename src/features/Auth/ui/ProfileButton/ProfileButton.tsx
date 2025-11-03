import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Address } from 'viem'
import { IconButton } from '@concero/ui-kit'
import { TUserResponse } from '@/entities/User'
import { Avatar, Text } from '@/shared/ui'
import { HStack, VStack } from '@/shared/ui/Stack'
import TrailArroRightIcon from '@/shared/assets/icons/monochrome/TrailArrowRight.svg?react'
import { routes } from '@/shared/consts/routing/routes'

import cls from './ProfileButton.module.pcss'
import clsx from 'clsx'

type TProps = {
	address: string
	nickname: TUserResponse['nickname']
	shortView?: boolean
	onClick?: () => void
	classNameAvatar?: string
}

export const ProfileButton = (props: TProps) => {
	const { address, nickname, shortView, onClick, classNameAvatar } = props
	const navigate = useNavigate()
	const [isHovered, setIsHovered] = useState<boolean>(false)

	if (shortView) {
		return (
			<Avatar
				address={address as Address}
				className={clsx(cls.profile_avatar, cls.big_avatar, classNameAvatar)}
				isHovered={isHovered}
				htmlProps={{
					onClick: () => {
						navigate(routes.profile)
						onClick?.()
					},
					onMouseEnter: () => setIsHovered(true),
					onMouseLeave: () => setIsHovered(false),
				}}
			/>
		)
	}

	const addressToShow = `${address.slice(0, 4)}...${address.slice(-4)}`
	return (
		<HStack
			justify="between"
			gap="space_0_5"
			className={cls.profile_button}
			htmlProps={{
				onClick: () => {
					navigate(routes.profile)
					onClick?.()
				},
				onMouseEnter: () => setIsHovered(true),
				onMouseLeave: () => setIsHovered(false),
			}}
		>
			<HStack gap={'space_0_5'} className={cls.wrap_avatar_text}>
				<Avatar
					address={address as Address}
					className={clsx(cls.profile_avatar, classNameAvatar)}
					isHovered={isHovered}
				/>
				{nickname ? (
					<VStack>
						<Text variant="heading_medium" ellipsis className={cls.nickname}>
							{nickname}
						</Text>
						<Text variant="body_medium" className={cls.address}>
							{addressToShow}
						</Text>
					</VStack>
				) : (
					<Text variant="heading_medium" className={cls.only_address}>
						{addressToShow}
					</Text>
				)}
			</HStack>
			<IconButton size="s" variant="tetrary" isHovered={isHovered}>
				<TrailArroRightIcon />
			</IconButton>
		</HStack>
	)
}
