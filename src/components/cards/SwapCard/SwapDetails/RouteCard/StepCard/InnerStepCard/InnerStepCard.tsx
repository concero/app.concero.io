import classNames from './InnerStepCard.module.pcss'
import { type Step, StepTypes } from '../../../../../../../types/StandardRoute'
import { useTranslation } from 'react-i18next'
import { CryptoSymbol } from '../../../../../../tags/CryptoSymbol/CryptoSymbol'
import { IconArrowRight, IconClock, IconCoins, IconGasStation } from '@tabler/icons-react'
import { roundNumberByDecimals, secondsConverter } from '../../../../../../../utils/formatting'

interface InnerStepCardProps {
	step: Step
}

export function InnerStepCard({ step }: InnerStepCardProps) {
	const { t } = useTranslation()
	const { from, to, tool } = step

	const stepTypeTitles: Record<string, string> = {
		[StepTypes.swap]: t('swapCard.routeCard.swap'),
		[StepTypes.bridge]: t('swapCard.routeCard.bridge'),
	}

	const stepTypeTitle = stepTypeTitles[step.type] ?? t('swapCard.routeCard.swap')

	return (
		<div className={classNames.container}>
			<div className={classNames.rowContainer}>
				<h5>{stepTypeTitle}</h5>
				<div className={classNames.tagContainer}>
					<CryptoSymbol src={to.token.logo_uri} />
					<p className={'body1'}>{to.token.symbol}</p>
				</div>
				<p className={'body1'}>{t('swapCard.routeCard.via')}</p>
				<p className={'body1'}>{tool.name}</p>
			</div>
			<div className={classNames.tagContainer}>
				<p className={'body1'}>
					{roundNumberByDecimals(from.token.amount)} {from.token.symbol}
				</p>
				<IconArrowRight size={13} color={'var(--color-text-secondary)'} />
				<p className={'body1'}>
					{roundNumberByDecimals(to.token.amount)} {to.token.symbol}
				</p>
			</div>
			<div className={classNames.rowContainer}>
				<div className={classNames.tagContainer}>
					<IconGasStation size={13} color={'var(--color-text-secondary)'} />
					<p className={'body1'}>${roundNumberByDecimals(tool.gas_usd, 2)}</p>
				</div>
				<div className={classNames.tagContainer}>
					<IconCoins size={13} color={'var(--color-text-secondary)'} />
					<p className={'body1'}>${roundNumberByDecimals(tool.fees_usd, 2)}</p>
				</div>
				<div className={classNames.tagContainer}>
					<IconClock size={13} color={'var(--color-text-secondary)'} />
					<p className={'body1'}>{secondsConverter(tool.estimated_execution_time_seconds)}</p>
				</div>
			</div>
		</div>
	)
}
