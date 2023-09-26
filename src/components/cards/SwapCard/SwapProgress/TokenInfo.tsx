import { FC } from 'react'
import classNames from './SwapProgress.module.pcss'
import { Avatar } from '../../../tags/Avatar/Avatar'

export const TokenInfo: FC = ({ direction }) => {
	const { token, chain, amount } = direction
	return (
		<div className={classNames.tokenInfoItem}>
			<Avatar src={token.logoURI} size="sm" />
			<h4>{amount}</h4>
			<h4>{token.symbol}</h4>
			<h4>on</h4>
			<h4>{chain.name}</h4>
		</div>
	)
}
