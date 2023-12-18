import { animated, useTrail } from '@react-spring/web'
import { memo } from 'react'
import classNames from '../../screens/EarnScreen/EarnScreen.module.pcss'
import { withErrorBoundary } from '../../wrappers/WithErrorBoundary'
import { TokensCard } from '../TokensCard/TokensCard'
import { RewardsCard } from '../RewardsCard/RewardsCard'
import { ProtocolCard } from '../ProtocolCard/ProtocolCard'
import { EarnHighlightsCard } from '../EarnHighlightsCard/EarnHighlightsCard'

const Protocol = memo(withErrorBoundary(ProtocolCard))
const Highlights = memo(withErrorBoundary(EarnHighlightsCard))
const Tokens = memo(withErrorBoundary(TokensCard))
const Rewards = memo(withErrorBoundary(RewardsCard))
// const Prediction = memo(withErrorBoundary(PredictionCard))

export function EarnDetailsCard({ earnState }) {
	const secondaryCards = [
		<Protocol earnState={earnState} />,
		<Highlights earnState={earnState} />,
		<Tokens earnState={earnState} />,
		earnState.rewardTokens && <Rewards earnState={earnState} />,
		// <Prediction earnState={earnState} />,
	]

	// console.log('secondaryCards', secondaryCards)
	const trail = useTrail(secondaryCards.length, {
		from: { opacity: 0, marginTop: '20px' },
		to: { opacity: 1, marginTop: '0px' },
		config: { mass: 0.5, tension: 200, friction: 20 },
		reset: true,
	})

	return (
		<div className={`card ${classNames.secondaryCardStack}`}>
			{trail.map(
				(style, index) =>
					secondaryCards[index] && (
						<animated.div key={`StakingHighlights-${index}`} style={style}>
							{secondaryCards[index]}
						</animated.div>
					),
			)}
		</div>
	)
}
