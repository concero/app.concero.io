import { FC } from 'react'
import { IconCornerUpRight, IconLogout } from '@tabler/icons-react'
import classNames from './TokensCard.module.pcss'
import { CardHeader } from '../CardHeader/CardHeader'
import { StakingState } from '../../screens/StakingScreen/stakingReducer/types'
import { colors } from '../../../constants/colors'
import { Button } from '../../buttons/Button/Button'
import { CryptoIcon } from '../../tags/CryptoSymbol/CryptoIcon'

interface TokensCardProps {
	stakingState: StakingState
}

export function TokenCard({ name, symbol, logoURI }) {
	return (
		<div className={`card ${classNames.tokenItemContainer}`}>
			<div className={classNames.tokenItemHeader}>
				<div className="row ac gap-sm">
					<CryptoIcon src={logoURI ?? null} />
					<h4 className="body1">{name}</h4>
				</div>
				<div className="row ac gap-sm">
					<h4 className="body1">{symbol}</h4>
					<IconCornerUpRight size={16} color={colors.text.secondary} />
				</div>
			</div>
		</div>
	)
}

export function TokenRatioCard({ item }) {
	const { ratio } = item
	return (
		<TokenCard item={item}>
			<div className={classNames.valueContainer}>
				<IconLogout size={16} color={colors.text.secondary} />
				<p className="body2">{`${ratio}%`}</p>
			</div>
			<div className={classNames.chartContainer}>
				{item.name ? (
					<div style={{ width: `${ratio}%` }} className={classNames.chart} />
				) : (
					<Button variant="subtle" size="sm">
						Explorer
					</Button>
				)}
			</div>
		</TokenCard>
	)
}

export const TokensCard: FC<TokensCardProps> = ({ stakingState }) => {
	// console.log('TokensCard', stakingState)

	const renderTokens = vault => {
		// loops through the tokens array and renders a TokenCard for each token.
		const tokens = []
		if (vault.inputTokens) {
			vault.inputTokens.forEach((token, index) => {
				if (token === null) tokens.push(<TokenCard key={index} name="Unknown" symbol="Unknown" logoURI={null} />)
				else tokens.push(<TokenCard key={token.name} name={token.name} symbol={token.symbol} logoURI={token.logoURI} />)
			})
		}
		return tokens
	}

	return (
		<div className={classNames.container}>
			<CardHeader title="Tokens" />
			<div className={classNames.innerContainer}>{renderTokens(stakingState.selectedVault)}</div>
		</div>
	)
}
