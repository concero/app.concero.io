import { FC } from 'react'
import classNames from './StakingHighlightsCard.module.pcss'
import { Highlight } from '../../tags/Highlight/Highlight'
import { StakingState } from '../../screens/StakingScreen/stakingReducer/types'
import { formatNumber } from '../../../utils/formatting'
import { useTranslation } from 'react-i18next'

interface StakingHighlightsCardProps {
	stakingState: StakingState
}

export const StakingHighlightsCard: FC<StakingHighlightsCardProps> = ({ stakingState }) => {
	const { t } = useTranslation()
	const renderHighlights = ({ data }) => {
		const highlights = []
		if (data.tvlUsd) {
			highlights.push(
				<Highlight key="tvl" title="TVL" value={`$${formatNumber(stakingState.selectedVault?.data?.tvlUsd)}`} tag={data.tvlPct30D ? formatNumber(data.tvlPct30D) : null} />,
			)
		}

		if (data.apy) {
			highlights.push(
				<Highlight key="apy" title="APY" value={`${formatNumber(data.apy, { decimalPlaces: 2 })}%`} tag={data.apyPct30D ? formatNumber(data.apyPct30D, { decimalPlaces: 2 }) : null} />,
			)
		}

		if (data.apyMean30d) {
			highlights.push(
				<Highlight
					key="apyMean30d"
					title="Mean APY (30d)"
					value={`${formatNumber(data.apyMean30d, { decimalPlaces: 2 })}%`}
					tag={data.apyMean30d ? formatNumber(data.apyMean30d, { decimalPlaces: 2 }) : null}
				/>,
			)
		}
		return highlights
	}

	return (
		<div className={classNames.container}>
			<h5 className="cardHeaderTitle">{t('stakingDetailsCard.vaultDetails')}</h5>
			{renderHighlights(stakingState.selectedVault)}
		</div>
	)
}
