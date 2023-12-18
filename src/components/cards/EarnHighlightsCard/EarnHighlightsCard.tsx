import { FC } from 'react'
import classNames from './EarnHighlightsCard.module.pcss'
import { Highlight } from '../../tags/Highlight/Highlight'
import { EarnState } from '../../screens/EarnScreen/earnReducer/types'
import { formatNumber } from '../../../utils/formatting'
import { useTranslation } from 'react-i18next'

interface EarnHighlightsCardProps {
	earnState: EarnState
}

export const EarnHighlightsCard: FC<EarnHighlightsCardProps> = ({ earnState }) => {
	const { t } = useTranslation()
	const renderHighlights = ({ data }) => {
		const highlights = []
		if (data.tvlUsd) {
			highlights.push(<Highlight key="tvl" title="TVL" value={`$${formatNumber(earnState.selectedVault?.data?.tvlUsd)}`} tag={data.tvlPct30D ? formatNumber(data.tvlPct30D) : null} />)
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
			{renderHighlights(earnState.selectedVault)}
		</div>
	)
}
