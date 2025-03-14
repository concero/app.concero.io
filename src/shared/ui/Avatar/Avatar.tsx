import BlockiesSvg from 'blockies-react-svg'
import cls from './Avatar.module.pcss'
import { Address } from 'viem'
type TProps = {
	address?: Address
}
export const Avatar = (props: TProps) => {
	const { address } = props
	if (!address) {
		return <div className={cls.default_avatar}></div>
	}
	return <BlockiesSvg address={address} className={cls.avatar} />
}
