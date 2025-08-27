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
}

export const ProfileButton = (props: TProps) => {
	const { address, nickname, shortView, onClick } = props
	const navigate = useNavigate()
	const [isHovered, setIsHovered] = useState<boolean>(false)

	if (shortView) {
		return (
			<Avatar
				address={address as Address}
				className={clsx(cls.profile_avatar, cls.big_avatar)}
				isHovered={isHovered}
				htmlProps={{
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
			<HStack gap={'space_0_5'}>
				<Avatar address={address as Address} className={cls.profile_avatar} isHovered={isHovered} />
				{nickname ? (
					<VStack>
						<Text variant="heading_medium" ellipsis>
							{nickname}
						</Text>
						<Text variant="body_small" className={cls.address}>
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
