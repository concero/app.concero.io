import BlockiesSvg from 'blockies-react-svg'
import cls from './Avatar.module.pcss'
import { Address } from 'viem'
import clsx from 'clsx'
import { SVGProps } from 'react'
import { OmitTyped } from '@/shared/types/utils'
type TProps = {
	address?: Address
	isHovered?: boolean
	className?: string
	htmlProps?: OmitTyped<Parameters<typeof BlockiesSvg>[0], 'className' | 'address'>
}
export const Avatar = (props: TProps) => {
	const { address, isHovered, className, htmlProps } = props
	if (!address) {
		return <div className={clsx(cls.default_avatar, className)}></div>
	}
	return (
		<BlockiesSvg
			{...htmlProps}
			address={address}
			className={clsx(cls.avatar, { [cls.hovered]: isHovered }, className)}
		/>
	)
}
