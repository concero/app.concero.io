import { type FC } from 'react'
import classNames from './EarnTXProgress.module.pcss'
import { Avatar } from '../../../../tags/Avatar/Avatar'
import { type Direction } from '../../../../../types/StandardRoute'
import { useTranslation } from 'react-i18next'

interface TokenInfoProps {
	direction: Direction
}

export const TokenInfo: FC<TokenInfoProps> = ({ direction }) => {
	const { token, chain, amount } = direction
	const { t } = useTranslation()

	return (
		<div className={classNames.tokenInfoItem}>
			<Avatar src={token.logoURI} size="sm" />
			<h4>{amount}</h4>
			<h4>{token.symbol}</h4>
			<h4>{t('swapProgressCard.on')}</h4>
			<h4>{chain.name}</h4>
		</div>
	)
}
